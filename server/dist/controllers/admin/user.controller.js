"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalByOrderItems = totalByOrderItems;
exports.totalByAllOrder = totalByAllOrder;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Errors
const string_error_1 = require("../../errors/string.error");
// Services
const user_service_1 = __importDefault(require("../../services/admin/user.service"));
// Utilities
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const encryption_utility_1 = __importDefault(require("../../utilities/encryption.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
// Constants
const constants_1 = __importDefault(require("../../constants"));
const order_service_1 = __importDefault(require("../../services/admin/order.service"));
const application_1 = __importDefault(require("../../constants/application"));
const egg_service_1 = __importDefault(require("../../services/admin/egg.service"));
const create = async (req, res) => {
    try {
        const params = {
            username: req.body.username,
            password: req.body.password,
            phone_number: req.body.phone_number,
            fullname: req.body.fullname,
            company_name: req.body?.company_name,
            note: req.body?.note,
        };
        const user = await user_service_1.default.create(params);
        return api_response_utility_1.default.result(res, user, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        if (e.code === constants_1.default.ERROR_CODE.DUPLICATED) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.CONFLICT, 'Username already exists.');
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
};
const login = async (req, res) => {
    try {
        const params = {
            username: req.body.username,
            password: req.body.password,
        };
        const user = await user_service_1.default.login(params);
        const cookie = await generateUserCookie(user.id);
        return api_response_utility_1.default.result(res, user, http_status_codes_1.default.OK, cookie);
    }
    catch (e) {
        if (e instanceof string_error_1.StringError) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e.message);
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, 'Something went wrong');
    }
};
const logout = (req, res) => {
    try {
        return res
            .clearCookie(constants_1.default.COOKIE.COOKIE_USER)
            .status(200)
            .json({ success: true });
    }
    catch (e) {
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e?.message || 'Something when wrong');
    }
};
const me = async (req, res) => {
    return api_response_utility_1.default.result(res, req.user, http_status_codes_1.default.OK);
};
const detail = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
        };
        const data = await user_service_1.default.detail(params);
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const clientOrderEggStatistic = async (req, res) => {
    try {
        let params = {
            user_id: parseInt(req.params.userId),
            startDate: api_utility_1.default.getQueryParam(req, 'start_date'),
            endDate: api_utility_1.default.getQueryParam(req, 'end_date'),
        };
        // get all eggs, even egg is deleted
        const eggs = await egg_service_1.default.list();
        // get all orders
        const { response: orders } = await order_service_1.default.list({
            ...params,
            limit: null,
            page: null,
        });
        let labels = [];
        let qtyDatas = [];
        let totalDatas = [];
        // loop through eggs,
        // get type_name as label
        // calculate total and qty of each egg
        for (let egg of eggs) {
            // get label
            labels.push(egg.type_name);
            // calculate total and qty
            let sumQty = 0;
            let sumTotal = 0;
            for (let order of orders) {
                let { total, quantity } = getSumTotalAndQtyByEggInOrder(order, egg.id);
                sumQty += quantity;
                sumTotal += total;
            }
            qtyDatas.push(sumQty);
            totalDatas.push(sumTotal);
        }
        api_response_utility_1.default.result(res, { labels, qtyDatas, totalDatas });
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
// helper function
function getSumTotalAndQtyByEggInOrder(order, egg_id) {
    let qty = 0;
    let total = 0;
    for (let item of order.items) {
        if (item.egg_id === egg_id &&
            order.status === application_1.default.status.SUCCESS) {
            qty += item.quantity;
            total += item.deal_price * item.quantity;
        }
    }
    return { quantity: qty, total: total };
}
const clientOrderOverview = async (req, res) => {
    try {
        let params = {
            user_id: parseInt(req.params.userId),
            startDate: api_utility_1.default.getQueryParam(req, 'start_date'),
            endDate: api_utility_1.default.getQueryParam(req, 'end_date'),
            limit: null,
            page: null,
        };
        // params.startDate = '2024-01-01';
        // params.endDate = '2024-03-09';
        const { response: ordersOfClient } = await order_service_1.default.list(params);
        let status = {
            success: 0,
            waiting_approval: 0,
            accepted: 0,
            rejected: 0,
            cancel: 0,
        };
        let sumTotal = 0;
        let sumQuantity = 0;
        ordersOfClient.forEach((order) => {
            switch (order.status) {
                case application_1.default.status.SUCCESS:
                    status.success += 1;
                    let { total, quantity } = totalByOrderItems(order.items);
                    sumTotal += total;
                    sumQuantity += quantity;
                    break;
                case application_1.default.status.WAITING_APPROVAL:
                    status.waiting_approval += 1;
                    break;
                case application_1.default.status.ACCEPTED:
                    status.accepted += 1;
                    break;
                case application_1.default.status.REJECTED:
                    status.rejected += 1;
                    break;
                case application_1.default.status.CANCELED:
                    status.cancel += 1;
                    break;
                default:
                    break;
            }
        });
        api_response_utility_1.default.result(res, { status, total: sumTotal, quantity: sumQuantity }, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
// helper function
function totalByOrderItems(orderItems) {
    let total = 0;
    let quantity = 0;
    for (let item of orderItems) {
        let totalOfItem = item.quantity * item.deal_price;
        total += totalOfItem;
        quantity += item.quantity;
    }
    return { total, quantity };
}
// helper function
function totalByAllOrder(orders) {
    let totalOfAllSuccessOrders = 0;
    for (let order of orders) {
        if (order.status === application_1.default.status.SUCCESS) {
            let { total } = totalByOrderItems(order.items);
            totalOfAllSuccessOrders += total;
        }
    }
    return totalOfAllSuccessOrders;
}
const update = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
            username: req.body?.username,
            password: req.body?.password,
            phone_number: req.body?.phone_number,
            fullname: req.body?.fullname,
            company_name: req.body?.company_name,
            note: req.body?.note,
            isAdmin: req.body?.isAdmin,
        };
        await user_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const updateMe = async (req, res) => {
    try {
        const params = {
            id: req.user.id,
            phone_number: req.body?.phone_number,
            fullname: req.body?.fullname,
            company_name: req.body?.company_name,
            note: req.body?.note,
        };
        await user_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const changePassword = async (req, res) => {
    try {
        // get user and hash password in db
        const userWithPassword = await user_service_1.default.detailWithPassword({
            id: req.user.id,
        });
        let currPw = req.body?.current_password;
        let newPw = req.body?.new_password;
        const verifyResult = await encryption_utility_1.default.verifyHash(currPw, userWithPassword.password);
        if (verifyResult) {
            newPw = await encryption_utility_1.default.generateHash(newPw, 10);
            const updatedPassword = await user_service_1.default.changePassword({
                user_id: userWithPassword.id,
                new_password: newPw,
            });
            api_response_utility_1.default.result(res, updatedPassword);
        }
        else
            api_response_utility_1.default.error(res, 400, 'Mật khẩu hiện tại không đúng', {
                current_password: {
                    name: 'Sai',
                    message: 'Mật khẩu hiện tại không đúng',
                },
            });
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const resetPasswordDefault = async (req, res) => {
    try {
        const defaultPassword = '12345678';
        const newPw = await encryption_utility_1.default.generateHash(defaultPassword, 10);
        let params = {
            user_id: parseInt(req.params.userId),
            new_password: newPw,
        };
        const updatedPassword = await user_service_1.default.changePassword(params);
        api_response_utility_1.default.result(res, updatedPassword, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const list = async (req, res) => {
    try {
        const limit = api_utility_1.default.getQueryParam(req, 'limit');
        const page = api_utility_1.default.getQueryParam(req, 'page');
        const isAdmin = api_utility_1.default.getQueryParam(req, 'isAdmin');
        const username = api_utility_1.default.getQueryParam(req, 'username');
        const fullname = api_utility_1.default.getQueryParam(req, 'fullname');
        const phone_number = api_utility_1.default.getQueryParam(req, 'phone_number');
        const company_name = api_utility_1.default.getQueryParam(req, 'company_name');
        const params = {
            limit,
            page,
            isAdmin,
            username,
            fullname,
            phone_number,
            company_name,
        };
        const data = await user_service_1.default.list(params);
        return api_response_utility_1.default.result(res, data.response, http_status_codes_1.default.OK, null, data.pagination);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const remove = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
        };
        await user_service_1.default.remove(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const generateUserCookie = async (userId) => {
    return {
        key: constants_1.default.COOKIE.COOKIE_USER,
        value: await encryption_utility_1.default.generateCookie(constants_1.default.COOKIE.KEY_USER_ID, userId.toString()),
    };
};
exports.default = {
    create,
    login,
    logout,
    me,
    detail,
    update,
    updateMe,
    list,
    remove,
    changePassword,
    resetPasswordDefault,
    clientOrderOverview,
    clientOrderEggStatistic,
};
