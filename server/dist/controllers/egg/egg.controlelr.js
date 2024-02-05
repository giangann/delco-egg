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
const egg_service_1 = __importDefault(require("../../services/egg/egg.service"));
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const eggCreateResult = yield egg_service_1.default.create(params);
        api_response_utility_1.default.result(res, eggCreateResult, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        if ((e.code = constants_1.default.ERROR_CODE.DUPLICATED)) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.CONFLICT, 'id of egg already exists');
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
});
// if not work as expected, check the ... operator in asign params from req.body
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = Object.assign({ id: parseInt(req.params.id) }, req.body);
        yield egg_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield egg_service_1.default.list();
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = { id: parseInt(req.params.id, 10) };
    try {
        const data = yield egg_service_1.default.remove(params);
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
exports.default = {
    create,
    update,
    list,
    remove,
};
