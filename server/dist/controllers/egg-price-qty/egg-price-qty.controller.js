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
const egg_price_qty_service_1 = __importDefault(require("../../services/egg-price-qty/egg-price-qty.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield egg_price_qty_service_1.default.list();
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = Object.assign({ id: parseInt(req.params.id) }, req.body);
        yield egg_price_qty_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const updateDayPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        console.log(Object.keys(req.body));
        const updateObject = req.body;
        const keys = Object.keys(req.body);
        keys.forEach((key, index) => __awaiter(void 0, void 0, void 0, function* () {
            let params = {
                egg_id: updateObject[key].egg_id,
                price_1: updateObject[key].price_1,
                price_2: updateObject[key].price_2,
                price_3: updateObject[key].price_3,
            };
            yield egg_price_qty_service_1.default.update(params);
        }));
        return api_response_utility_1.default.result(res, updateObject, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const updateDayQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        console.log(Object.keys(req.body));
        const updateObject = req.body;
        const keys = Object.keys(req.body);
        keys.forEach((key, index) => __awaiter(void 0, void 0, void 0, function* () {
            let params = {
                egg_id: updateObject[key].egg_id,
                quantity: updateObject[key].quantity,
            };
            yield egg_price_qty_service_1.default.update(params);
        }));
        return api_response_utility_1.default.result(res, updateObject, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
exports.default = { list, update, updateDayPrice, updateDayQuantity };
