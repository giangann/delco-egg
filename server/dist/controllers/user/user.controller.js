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
// Errors
const string_error_1 = require("../../errors/string.error");
// Services
const user_service_1 = __importDefault(require("../../services/user/user.service"));
// Utilities
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const encryption_utility_1 = __importDefault(require("../../utilities/encryption.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
// Constants
const constants_1 = __importDefault(require("../../constants"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const params = {
            username: req.body.username,
            password: req.body.password,
            phone_number: req.body.phone_number,
            fullname: req.body.fullname,
            company_name: (_a = req.body) === null || _a === void 0 ? void 0 : _a.company_name,
            note: (_b = req.body) === null || _b === void 0 ? void 0 : _b.note,
        };
        const user = yield user_service_1.default.create(params);
        return api_response_utility_1.default.result(res, user, http_status_codes_1.default.CREATED);
    }
    catch (e) {
        if (e.code === constants_1.default.ERROR_CODE.DUPLICATED) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.CONFLICT, 'Username already exists.');
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            username: req.body.username,
            password: req.body.password,
        };
        const user = yield user_service_1.default.login(params);
        const cookie = yield generateUserCookie(user.id);
        return api_response_utility_1.default.result(res, user, http_status_codes_1.default.OK, cookie);
    }
    catch (e) {
        if (e instanceof string_error_1.StringError) {
            return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, e.message);
        }
        return api_response_utility_1.default.error(res, http_status_codes_1.default.BAD_REQUEST, 'Something went wrong');
    }
});
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return api_response_utility_1.default.result(res, req.user, http_status_codes_1.default.OK);
});
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
        };
        const data = yield user_service_1.default.detail(params);
        return api_response_utility_1.default.result(res, data, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g, _h, _j;
    try {
        const params = {
            id: parseInt(req.params.id, 10),
            username: (_c = req.body) === null || _c === void 0 ? void 0 : _c.username,
            password: (_d = req.body) === null || _d === void 0 ? void 0 : _d.password,
            phone_number: (_e = req.body) === null || _e === void 0 ? void 0 : _e.phone_number,
            fullname: (_f = req.body) === null || _f === void 0 ? void 0 : _f.fullname,
            company_name: (_g = req.body) === null || _g === void 0 ? void 0 : _g.company_name,
            note: (_h = req.body) === null || _h === void 0 ? void 0 : _h.note,
            isAdmin: (_j = req.body) === null || _j === void 0 ? void 0 : _j.isAdmin,
        };
        yield user_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const updateMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o, _p, _q;
    try {
        const params = {
            id: parseInt(req.params.id, 10),
            username: (_k = req.body) === null || _k === void 0 ? void 0 : _k.username,
            password: (_l = req.body) === null || _l === void 0 ? void 0 : _l.password,
            phone_number: (_m = req.body) === null || _m === void 0 ? void 0 : _m.phone_number,
            fullname: (_o = req.body) === null || _o === void 0 ? void 0 : _o.fullname,
            company_name: (_p = req.body) === null || _p === void 0 ? void 0 : _p.company_name,
            note: (_q = req.body) === null || _q === void 0 ? void 0 : _q.note,
        };
        yield user_service_1.default.update(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const data = yield user_service_1.default.list(params);
        return api_response_utility_1.default.result(res, data.response, http_status_codes_1.default.OK, null, data.pagination);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
        };
        yield user_service_1.default.remove(params);
        return api_response_utility_1.default.result(res, params, http_status_codes_1.default.OK);
    }
    catch (e) {
        api_response_utility_1.default.exception(res, e);
    }
});
const generateUserCookie = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        key: constants_1.default.COOKIE.COOKIE_USER,
        value: yield encryption_utility_1.default.generateCookie(constants_1.default.COOKIE.KEY_USER_ID, userId.toString()),
    };
});
exports.default = {
    create,
    login,
    me,
    detail,
    update,
    updateMe,
    list,
    remove,
};
