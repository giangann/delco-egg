"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const constants_1 = __importDefault(require("../../constants"));
const egg_service_1 = __importDefault(require("../../services/admin/egg.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const egg_price_qty_service_1 = __importDefault(require("../../services/admin/egg-price-qty.service"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const order_service_1 = __importDefault(require("../../services/admin/order.service"));
const application_1 = __importDefault(require("../../constants/application"));
const create = async (req, res) => {
    try {
        const params = req.body;
        const newEgg = await egg_service_1.default.create(params);
        api_response_utility_1.default.result(res, newEgg, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        if ((e.code = constants_1.default.ERROR_CODE.DUPLICATED)) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.CONFLICT, 'id of egg already exists');
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
};
// if not work as expected, check the ... operator in asign params from req.body
const update = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id),
            ...req.body,
        };
        await egg_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const list = async (req, res) => {
    try {
        let params = {
            isDeleted: api_utility_1.default.getQueryParam(req, 'isDeleted'),
        };
        const data = await egg_service_1.default.list(params);
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
const remove = async (req, res) => {
    const params = { id: parseInt(req.params.id, 10) };
    try {
        // check is avaiable for delete
        const haveInWaitingOrder = await checkIsEggHaveInWaitingOrder(params.id);
        if (haveInWaitingOrder) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.NOT_ACCEPTABLE, 'Sản phẩm vẫn còn tồn tại trong đơn hàng chưa phê duyệt');
        }
        // mark as isDeleted
        const data = await egg_service_1.default.remove(params);
        // remove the corrsepond egg_id in eggPriceQty table
        const removeRow = await egg_price_qty_service_1.default.remove({
            egg_id: params.id,
        });
        if (data.affected > 0) {
            return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
        }
        else
            return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, 'Xóa thất bại');
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
// helper function
async function checkIsEggHaveInWaitingOrder(eggId) {
    const { response: listWaitingOrder } = await order_service_1.default.list({
        status: application_1.default.status.WAITING_APPROVAL,
        limit: null,
        page: null,
    });
    for (let order of listWaitingOrder) {
        if (order.status === application_1.default.status.WAITING_APPROVAL) {
            for (let orderItem of order.items) {
                if (orderItem.egg_id === eggId)
                    return true;
            }
        }
    }
    return false;
}
exports.default = {
    create,
    update,
    list,
    remove,
};
