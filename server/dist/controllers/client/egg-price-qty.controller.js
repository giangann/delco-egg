"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const egg_price_qty_service_1 = __importDefault(require("../../services/client/egg-price-qty.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const list = async (req, res) => {
    try {
        const data = await egg_price_qty_service_1.default.list();
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
};
exports.default = { list };
