"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = __importDefault(require("../../constants"));
const application_1 = __importDefault(require("../../constants/application"));
const order_detail_service_1 = __importDefault(require("../../services/order-detail/order-detail.service"));
const order_service_1 = __importDefault(require("../../services/order/order.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const limit = api_utility_1.default.getQueryParam(req, 'limit');
        const page = api_utility_1.default.getQueryParam(req, 'page');
        let params = {
            limit,
            page,
        };
        if (!user.isAdmin)
            params.user_id = user.id;
        const listOrder = yield order_service_1.default.list(params);
        return api_response_utility_1.default.result(res, listOrder, http_status_codes_1.default.OK, null);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        let params = {
            id: parseInt(req.params.id),
        };
        if (!user.isAdmin)
            params.user_id = user.id;
        const order = yield order_service_1.default.detail(params);
        return api_response_utility_1.default.result(res, order, http_status_codes_1.default.OK, null);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.user.id;
        const params = {
            user_id: user_id,
            date: req.body.date,
            time: req.body.time,
            status: constants_1.default.APPLICATION.status.WAITING_APPROVAL,
            items: req.body.orders,
        };
        let newOrder = yield order_service_1.default.create(params);
        let createdItems = [];
        // save items
        for (let item of params.items) {
            let itemDetail = yield order_detail_service_1.default.create(Object.assign({ order_id: newOrder.id }, item));
            createdItems.push(itemDetail);
        }
        newOrder.items = createdItems;
        api_response_utility_1.default.result(res, newOrder, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
});
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            updateData = yield order_service_1.default.updateStatus(params);
        }
        // REJECT OR CANCEL REQUIRE "REASON"
        if (newStatus in
            [application_1.default.status.REJECTED, application_1.default.status.CANCELED]) {
            updateData = yield order_service_1.default.rejectOrCancelOrder(Object.assign(Object.assign({}, params), { reason: req.body.reason }));
        }
        api_response_utility_1.default.result(res, updateData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const params = {
            id: parseInt(req.params.id),
            user_id: req.user.id,
            date: (_a = req.body) === null || _a === void 0 ? void 0 : _a.date,
            time: (_b = req.body) === null || _b === void 0 ? void 0 : _b.time,
            note: (_c = req.body) === null || _c === void 0 ? void 0 : _c.note,
        };
        const updateData = order_service_1.default.update(params);
        api_response_utility_1.default.result(res, updateData, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e);
    }
});
exports.default = { list, detail, create, updateStatus, update };
