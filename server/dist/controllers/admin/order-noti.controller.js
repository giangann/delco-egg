"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_noti_service_1 = __importDefault(require("../../services/admin/order-noti.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const list = async (req, res) => {
    try {
        const user = req.user;
        const listNoti = await order_noti_service_1.default.list({
            to_user_id: user.id,
            is_display: true,
        });
        api_response_utility_1.default.result(res, listNoti);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
const maskAsRead = async (req, res) => {
    try {
        const notiId = parseInt(req.params.id);
        const updateNotiRes = order_noti_service_1.default.update({
            id: notiId,
            is_read: true,
        });
        api_response_utility_1.default.result(res, updateNotiRes);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
};
exports.default = {
    list,
    maskAsRead,
};
