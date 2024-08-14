"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../entities/order/order.entity");
const string_error_1 = require("../../errors/string.error");
const application_1 = __importDefault(require("../../constants/application"));
const api_utility_1 = __importDefault(require("../../utilities/api.utility"));
const list = async (params) => {
    const orderRepo = (0, typeorm_1.getRepository)(order_entity_1.Order).createQueryBuilder('order');
    orderRepo.leftJoinAndSelect('order.user', 'user');
    orderRepo.leftJoinAndSelect('order.items', 'item');
    orderRepo.leftJoinAndSelect('item.egg', 'egg');
    const startDate = params.startDate;
    const endDate = params.endDate;
    if (startDate && endDate) {
        orderRepo.andWhere('order.date >= :startDate', { startDate });
        orderRepo.andWhere('order.date < :endDate + interval 1 day', {
            endDate,
        });
    }
    const orderStatus = params.status;
    if (Object.values(application_1.default.status).includes(orderStatus)) {
        orderRepo.andWhere('order.status = :orderStatus', { orderStatus });
    }
    const date = params.date;
    if (date) {
        orderRepo.andWhere('order.date = :date', { date });
    }
    const userId = params.user_id;
    if (userId) {
        orderRepo.andWhere('order.user_id = :userId', { userId });
    }
    const userFullName = params.fullname;
    if (userFullName) {
        orderRepo.andWhere('(LOWER(user.fullname) LIKE LOWER(:fullname))', {
            fullname: `%${userFullName}%`,
        });
    }
    const phoneNumber = params.phone_number;
    if (phoneNumber) {
        orderRepo.andWhere('(LOWER(user.phone_number) LIKE LOWER(:phone_number))', {
            phone_number: `%${phoneNumber}%`,
        });
    }
    let listOrders = await orderRepo.getMany();
    const total = listOrders.length;
    const limit = params.limit;
    const page = params.page;
    if (limit) {
        if (page) {
            listOrders = listOrders.slice(limit * (page - 1), limit * page);
        }
        else {
            listOrders = listOrders.slice(0, limit);
        }
    }
    const response = listOrders.map((order) => {
        return {
            ...order,
            username: order.user.username,
            fullname: order.user.fullname,
            phone_number: order.user.phone_number,
            company_name: order.user.company_name,
        };
    });
    const pagiRes = api_utility_1.default.getPagination(total, limit, page);
    return { response, pagination: pagiRes.pagination };
};
const detail = async (params) => {
    const { id } = params;
    const orderRepo = (0, typeorm_1.getRepository)(order_entity_1.Order)
        .createQueryBuilder('order')
        .where('order.id = :id', { id: id })
        .leftJoinAndSelect('order.user', 'user');
    const order = await orderRepo.getOne();
    return order;
};
const create = async (params) => {
    const order = new order_entity_1.Order();
    order.date = params.date;
    order.time = params.time;
    order.user_id = params.user_id;
    order.status = params.status;
    order.items = params.items;
    const createdOrder = await (0, typeorm_1.getRepository)(order_entity_1.Order).save(order);
    return createdOrder;
};
const updateStatus = async (params) => {
    const order = await (0, typeorm_1.getRepository)(order_entity_1.Order).findOne({ id: params.id });
    if (!order)
        throw new string_error_1.StringError('Order not exists');
    const updateData = await (0, typeorm_1.getRepository)(order_entity_1.Order).update({ id: params.id }, { ...params });
    return updateData;
};
const rejectOrCancelOrder = async (params) => {
    const order = await (0, typeorm_1.getRepository)(order_entity_1.Order).findOne({ id: params.id });
    if (!order)
        throw new string_error_1.StringError('Order not exists');
    const updateData = await (0, typeorm_1.getRepository)(order_entity_1.Order).update({ id: params.id }, { ...params });
    return updateData;
};
const update = async (params) => {
    const order = await (0, typeorm_1.getRepository)(order_entity_1.Order).findOne({ id: params.id });
    if (!order)
        throw new string_error_1.StringError('Order not exists');
    const updateData = await (0, typeorm_1.getRepository)(order_entity_1.Order).update({ id: params.id }, { ...params });
    return updateData;
};
exports.default = {
    list,
    create,
    updateStatus,
    update,
    rejectOrCancelOrder,
    detail,
};
