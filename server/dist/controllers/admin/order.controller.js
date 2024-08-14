"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.totalByOrderItems = totalByOrderItems;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = __importDefault(require("../../constants"));
const application_1 = __importDefault(require("../../constants/application"));
const egg_price_qty_service_1 = __importDefault(require("../../services/admin/egg-price-qty.service"));
const order_noti_service_1 = __importDefault(require("../../services/admin/order-noti.service"));
const order_service_1 = __importDefault(require("../../services/admin/order.service"));
const order_detail_service_1 = __importDefault(require("../../services/client/order-detail.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const web_socket_service_1 = __importDefault(require("../../services/client/web-socket.service"));
const list = async (req, res) => {
    try {
        const limit = api_utility_1.default.getQueryParam(req, 'limit');
        const page = api_utility_1.default.getQueryParam(req, 'page');
        const user_id = api_utility_1.default.getQueryParam(req, 'user_id');
        const status = parseInt(api_utility_1.default.getQueryParam(req, 'status'));
        const startDate = api_utility_1.default.getQueryParam(req, 'start_date');
        const endDate = api_utility_1.default.getQueryParam(req, 'end_date');
        const fullname = api_utility_1.default.getQueryParam(req, 'fullname');
        const phone_number = api_utility_1.default.getQueryParam(req, 'phone_number');
        let params = {
            limit,
            page,
            user_id,
            status,
            startDate,
            endDate,
            fullname,
            phone_number,
        };
        let { response: listOrder, pagination } = await order_service_1.default.list(params);
        listOrder = listOrder.map((order) => {
            return { ...order, total: totalByOrderItems(order.items) };
        });
        return api_response_utility_1.default.result(res, listOrder, http_status_codes_1.default.OK, null, pagination);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const detail = async (req, res) => {
    try {
        let params = {
            id: parseInt(req.params.id),
        };
        const order = await order_service_1.default.detail(params);
        // get correspond items
        const itemsByOrderId = await order_detail_service_1.default.getByOrderId(params.id);
        order.items = itemsByOrderId;
        // get correspond notis
        const noties = await order_noti_service_1.default.list({
            to_user_id: order.user_id,
            order_id: order.id,
        });
        order.notis = noties;
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
            items: req.body.orders,
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
        //------------- 1. GET DETAIL OF ORDER BY ID-------------
        const thisOrder = await order_service_1.default.detail({ id: id });
        //------------- 2. DEFINE PARAMS FOR UPDATE STATUS-------------
        let params = {
            id: id,
            status: newStatus,
        };
        // reject/cancel require <reason>
        if (newStatus === application_1.default.status.REJECTED ||
            newStatus === application_1.default.status.CANCELED) {
            params.reason = req.body?.reason;
        }
        // update status
        updateData = await order_service_1.default.updateStatus(params);
        //------------- 3. MAKE SIDE EFFECT (NOTI, EGG-QTY):-------------
        // if accepted: decrese egg-qty, hide noti of admin, noti for user
        if (newStatus === application_1.default.status.ACCEPTED) {
            const orderItems = await order_detail_service_1.default.getByOrderId(id);
            const decreseRes = await decreseEggQtys(orderItems, res);
            const notiAction = await handleNotiForAcceptOrder(req.user.id, thisOrder.user_id, id);
        }
        // if reject/cancel/success, noti for user
        if ([
            application_1.default.status.REJECTED,
            application_1.default.status.CANCELED,
            application_1.default.status.SUCCESS,
        ].includes(newStatus)) {
            let content;
            switch (newStatus) {
                case application_1.default.status.REJECTED:
                    content = application_1.default.noti.content.REJECTED;
                    break;
                case application_1.default.status.CANCELED:
                    content = application_1.default.noti.content.CANCELED;
                    break;
                case application_1.default.status.SUCCESS:
                    content = application_1.default.noti.content.SUCCESS;
                    break;
                default:
                    break;
            }
            await order_noti_service_1.default.create({
                content,
                from_user_id: req.user.id,
                to_user_id: thisOrder.user_id,
                new_status: newStatus,
                order_id: id,
            });
        }
        // Web-socket noti service:
        await web_socket_service_1.default.sendNotiToUser(thisOrder.user_id, id);
        //OTHER NOTIFICATION SERVICE LIKE: ZALO-OA
        api_response_utility_1.default.result(res, updateData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
const handleNotiForAcceptOrder = async (fromUserId, toUserId, orderId) => {
    // new_status of this noti is waiting, not accepted
    // find current noti
    const correspondingNoti = await order_noti_service_1.default.detail({
        order_id: orderId,
        new_status: application_1.default.status.WAITING_APPROVAL,
    });
    if (!correspondingNoti) {
        return false;
    }
    // update noti: hide for admin
    const disappearNoti = await order_noti_service_1.default.update({
        id: correspondingNoti.id,
        is_display: false,
    });
    // create new noti for client
    const newNotiForClient = await order_noti_service_1.default.create({
        content: application_1.default.noti.content.ACCEPTED,
        from_user_id: fromUserId,
        to_user_id: toUserId,
        new_status: application_1.default.status.ACCEPTED,
        order_id: orderId,
    });
};
const decreseEggQtys = async (orderEggQtys, res) => {
    const decreseRes = await Promise.all(orderEggQtys.map(async (eggQty) => {
        const currEggQty = await egg_price_qty_service_1.default.byEggId(eggQty.egg_id);
        // if current quantity is less than newEggQty then throw message for admin
        if (currEggQty.quantity < eggQty.quantity) {
            api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, `${eggQty.egg_id} hết hàng`);
        }
        const newEggQty = {
            egg_id: currEggQty.egg_id,
            quantity: currEggQty.quantity - eggQty.quantity,
        };
        await egg_price_qty_service_1.default.update(newEggQty);
    }));
    return decreseRes;
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
const orderStatisticByStatus = async (req, res) => {
    try {
        const { response: orderListByTimeRange } = await order_service_1.default.list({
            limit: req.body.limit,
            page: req.body.page,
            startDate: req.query.start_date,
            endDate: req.query.end_date,
        });
        let dataSets = [0, 0, 0, 0, 0];
        orderListByTimeRange.forEach((order) => {
            switch (order.status) {
                case application_1.default.status.ACCEPTED:
                    dataSets[0] += 1;
                    break;
                case application_1.default.status.REJECTED:
                    dataSets[1] += 1;
                    break;
                case application_1.default.status.SUCCESS:
                    dataSets[2] += 1;
                    break;
                case application_1.default.status.CANCELED:
                    dataSets[3] += 1;
                    break;
                case application_1.default.status.WAITING_APPROVAL:
                    dataSets[4] += 1;
                    break;
                default:
                    break;
            }
        });
        api_response_utility_1.default.result(res, dataSets, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
const orderStatisticByTotal = async (req, res) => {
    try {
        let limit = api_utility_1.default.getQueryParam(req, 'limit');
        const { response: successOrderListByTimeRange, } = await order_service_1.default.list({
            limit: null,
            page: api_utility_1.default.getQueryParam(req, 'page'),
            startDate: api_utility_1.default.getQueryParam(req, 'start_date'),
            endDate: api_utility_1.default.getQueryParam(req, 'end_date'),
            user_id: api_utility_1.default.getQueryParam(req, 'user_id'),
            status: application_1.default.status.SUCCESS,
        });
        let statisticData = successOrderListByTimeRange.map((order) => {
            return {
                ...order,
                total: totalByOrderItems(order.items),
            };
        });
        let sortedData = sortOrderByTotal(statisticData);
        if (limit) {
            sortedData = sortedData.slice(0, limit);
        }
        api_response_utility_1.default.result(res, sortedData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
// helper function
function totalByOrderItems(orderItems) {
    let total = 0;
    for (let item of orderItems) {
        let totalOfItem = item.quantity * item.deal_price;
        total += totalOfItem;
    }
    return total;
}
function sortOrderByTotal(orderList) {
    let sortedOrderList = orderList.sort((a, b) => b.total - a.total);
    return sortedOrderList;
}
exports.default = {
    list,
    detail,
    create,
    updateStatus,
    update,
    orderStatisticByStatus,
    orderStatisticByTotal,
};
