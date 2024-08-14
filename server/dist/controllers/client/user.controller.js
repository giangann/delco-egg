"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// Errors
const string_error_1 = require("../../errors/string.error");
// Services
const user_service_1 = __importDefault(require("../../services/client/user.service"));
// Utilities
const api_response_utility_1 = __importDefault(require("../../utilities/api-response.utility"));
const encryption_utility_1 = __importDefault(require("../../utilities/encryption.utility"));
// Constants
const constants_1 = __importDefault(require("../../constants"));
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
const update = async (req, res) => {
    try {
        const params = {
            id: parseInt(req.params.id, 10),
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
const generateUserCookie = async (userId) => {
    return {
        key: constants_1.default.COOKIE.COOKIE_USER,
        value: await encryption_utility_1.default.generateCookie(constants_1.default.COOKIE.KEY_USER_ID, userId.toString()),
    };
};
exports.default = {
    login,
    logout,
    me,
    detail,
    update,
    updateMe,
    changePassword,
};
