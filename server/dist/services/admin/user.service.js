"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
// Entities
const user_entity_1 = require("../../entities/user/user.entity");
// Utilities
const encryption_utility_1 = __importDefault(require("../../utilities/encryption.utility"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
// Errors
const string_error_1 = require("../../errors/string.error");
const where = { isDeleted: false };
const create = async (params) => {
    const item = new user_entity_1.User();
    item.password = await encryption_utility_1.default.generateHash(params.password, 10);
    const userData = await (0, typeorm_1.getRepository)(user_entity_1.User).save({
        ...params,
        ...item,
    });
    return api_utility_1.default.sanitizeUser(userData);
};
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
const getById = async (params) => {
    try {
        const data = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne({ id: params.id });
        return api_utility_1.default.sanitizeUser(data);
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
const list = async (params) => {
    let userRepo = (0, typeorm_1.getRepository)(user_entity_1.User).createQueryBuilder('user');
    userRepo = userRepo.where('user.isDeleted = :isDeleted', {
        isDeleted: false,
    });
    if (params.username) {
        userRepo.andWhere('(LOWER(user.username) LIKE LOWER(:username))', {
            username: `%${params.username}%`,
        });
    }
    if (params.company_name) {
        userRepo.andWhere('(LOWER(user.company_name) LIKE LOWER(:company_name))', { company_name: `%${params.company_name}%` });
    }
    if (params.fullname) {
        userRepo.andWhere('(LOWER(user.fullname) LIKE LOWER(:fullname))', {
            fullname: `%${params.fullname}%`,
        });
    }
    if (params.phone_number) {
        userRepo.andWhere('(LOWER(user.phone_number) LIKE LOWER(:phone_number))', {
            phone_number: `%${params.phone_number}%`,
        });
    }
    if (params.isAdmin) {
        userRepo.andWhere('user.isAdmin = :isAdmin', {
            isAdmin: params.isAdmin,
        });
    }
    // Pagination
    const paginationRepo = userRepo;
    const total = await paginationRepo.getMany();
    const pagRes = api_utility_1.default.getPagination(total.length, params.limit, params.page);
    userRepo = userRepo
        .limit(params.limit)
        .offset(api_utility_1.default.getOffset(params.limit, params.page));
    const users = await userRepo.getMany();
    const response = [];
    if (users && users.length) {
        for (const item of users) {
            response.push(api_utility_1.default.sanitizeUser(item));
        }
    }
    return { response, pagination: pagRes.pagination };
};
const listAdmin = async () => {
    const listAdmin = await (0, typeorm_1.getRepository)(user_entity_1.User).find({ isAdmin: true });
    return listAdmin;
};
const remove = async (params) => {
    const query = { ...where, id: params.id };
    const user = await (0, typeorm_1.getRepository)(user_entity_1.User).findOne(query);
    if (!user) {
        throw new string_error_1.StringError('User is not existed');
    }
    return await (0, typeorm_1.getRepository)(user_entity_1.User).update(query, {
        isDeleted: true,
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
    create,
    login,
    getById,
    detail,
    update,
    list,
    remove,
    listAdmin,
    detailWithPassword,
    changePassword,
};
