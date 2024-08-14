"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = __importDefault(require("../../constants"));
const application_1 = __importDefault(require("../../constants/application"));
const order_detail_service_1 = __importDefault(require("../../services/client/order-detail.service"));
const order_service_1 = __importDefault(require("../../services/client/order.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const user_service_1 = __importDefault(require("../../services/client/user.service"));
const order_noti_service_1 = __importDefault(require("../../services/client/order-noti.service"));
const web_socket_service_1 = __importDefault(require("../../services/client/web-socket.service"));
const list = async (req, res) => {
    try {
        const user = req.user;
        const limit = api_utility_1.default.getQueryParam(req, 'limit');
        const page = api_utility_1.default.getQueryParam(req, 'page');
        let params = {
            limit,
            page,
        };
        params.user_id = user.id;
        const listOrder = await order_service_1.default.list(params);
        return api_response_utility_1.default.result(res, listOrder, http_status_codes_1.default.OK, null);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const detail = async (req, res) => {
    try {
        const user = req.user;
        // order info by id (not allow user get order of other user)
        let params = {
            id: parseInt(req.params.id),
            user_id: user.id,
        };
        const order = await order_service_1.default.detail(params);
        // get items of this order
        const itemsByOrderId = await order_detail_service_1.default.getByOrderId(params.id);
        order.items = itemsByOrderId;
        // get tracking list notis of this order
        const listNotisByOrderId = await order_noti_service_1.default.list({
            order_id: params.id,
            to_user_id: params.user_id,
        });
        order.notis = listNotisByOrderId;
        return api_response_utility_1.default.result(res, order, http_status_codes_1.default.OK, null);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const create = async (req, res) => {
    try {
        const user_id = req.user.id;
        const params = {
            user_id: user_id,
            date: req.body.date,
            time: req.body.time,
            status: constants_1.default.APPLICATION.status.WAITING_APPROVAL,
            items: req.body.items,
        };
        let newOrder = await order_service_1.default.create(params);
        let createdItems = [];
        // save items
        for (let item of params.items) {
            let itemDetail = await order_detail_service_1.default.create({
                order_id: newOrder.id,
                ...item,
            });
            createdItems.push(itemDetail);
        }
        newOrder.items = createdItems;
        // noti for all admin
        const listAdmin = await user_service_1.default.listAdmin();
        const listOrderNotiParams = listAdmin.map((admin) => {
            return {
                from_user_id: req.user.id,
                to_user_id: admin.id,
                order_id: newOrder.id,
                new_status: constants_1.default.APPLICATION.status.WAITING_APPROVAL,
                content: constants_1.default.APPLICATION.noti.content.CREATED,
            };
        });
        await order_noti_service_1.default.createMany(listOrderNotiParams);
        // realtime noti for all admin
        const listAdminRealTimeNotiParams = listAdmin.map((admin) => {
            return {
                order_id: newOrder.id,
                user_id: admin.id,
            };
        });
        web_socket_service_1.default.sendNotiToListUser(listAdminRealTimeNotiParams);
        api_response_utility_1.default.result(res, newOrder, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
const updateStatus = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const newStatus = req.body.status;
        let updateData;
        let params = {
            id: id,
            status: newStatus,
        };
        // ACCEPTED OR SUCCESS NOT REQUIRE "REASON"
        if (newStatus in
            [application_1.default.status.ACCEPTED, application_1.default.status.SUCCESS]) {
            updateData = await order_service_1.default.updateStatus(params);
        }
        // REJECT OR CANCEL REQUIRE "REASON"
        if (newStatus in
            [application_1.default.status.REJECTED, application_1.default.status.CANCELED]) {
            updateData = await order_service_1.default.rejectOrCancelOrder({
                ...params,
                reason: req.body.reason,
            });
        }
        api_response_utility_1.default.result(res, updateData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
const update = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id),
            user_id: req.user.id,
            date: req.body?.date,
            time: req.body?.time,
            note: req.body?.note,
        };
        const updateData = order_service_1.default.update(params);
        api_response_utility_1.default.result(res, updateData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
exports.default = { list, detail, create, updateStatus, update };
