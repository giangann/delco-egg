"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// Entities
const user_entity_1 = require("../../entities/user/user.entity");
// Utilities
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
const encryption_utility_1 = __importDefault(require("../../utilities/encryption.utility"));
// Errors
const string_error_1 = require("../../errors/string.error");
const where = { isDeleted: false };
const login = async (params) => {
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User)
        .createQueryBuilder('user')
        .where('user.username = :username', { username: params.username })
        .select([
        'user.createdAt',
        'user.updatedAt',
        'user.id',
        'user.username',
        'user.password',
        'user.phone_number',
        'user.fullname',
        'user.company_name',
        'user.note',
        'user.isDeleted',
    ])
        .getOne();
    if (!user) {
        throw new string_error_1.StringError('Tên đăng nhập chưa được đăng ký');
    }
    if (await encryption_utility_1.default.verifyHash(params.password, user.password)) {
        return api_utility_1.default.sanitizeUser(user);
    }
    throw new string_error_1.StringError('Mật khẩu bạn đã nhập không đúng');
};
const listAdmin = async () => {
    const listAdmin = await (0, typeorm_1.getRepository)(user_entity_1.User).find({ isAdmin: true });
    return listAdmin;
};
const getById = async (params) => {
    try {
        const data = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne({ id: params.id });
        return api_utility_1.default.sanitizeUser(data);
        return data;
    }
    catch (e) {
        return null;
    }
};
const detail = async (params) => {
    const query = {
        where: { ...where, id: params.id },
    };
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne(query);
    if (!user) {
        throw new string_error_1.StringError('User is not existed');
    }
    return api_utility_1.default.sanitizeUser(user);
};
const update = async (params) => {
    const query = { ...where, id: params.id };
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne(query);
    if (!user) {
        throw new string_error_1.StringError('User is not existed');
    }
    return await (0, typeorm_1.getRepository)(user_entity_1.User).update(query, {
        ...params,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
};
const detailWithPassword = async (params) => {
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User)
        .createQueryBuilder('user')
        .where('id=:id', { id: params.id })
        .select([
        'user.createdAt',
        'user.updatedAt',
        'user.id',
        'user.username',
        'user.password',
        'user.phone_number',
        'user.fullname',
        'user.company_name',
        'user.note',
        'user.isDeleted',
    ])
        .getOne();
    return user;
};
const changePassword = async (params) => {
    const updatedRecord = await (0, typeorm_1.getRepository)(user_entity_1.User).update({ id: params.user_id }, { password: params.new_password });
    return updatedRecord;
};
exports.default = {
    login,
    listAdmin,
    getById,
    detail,
    update,
    detailWithPassword,
    changePassword,
};
