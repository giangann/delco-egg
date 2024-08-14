"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../entities/order/order.entity");
const string_error_1 = require("../../errors/string.error");
const list = async (params) => {
    const listOrders = await (0, typeorm_1.getRepository)(order_entity_1.Order)
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'item')
        .leftJoinAndSelect('order.user', 'user')
        .andWhere('order.user_id = :user_id', {
        user_id: params.user_id,
    })
        .getMany();
    return listOrders.map((order) => {
        return {
            ...order,
            username: order.user.username,
            fullname: order.user.fullname,
            phone_number: order.user.phone_number,
            company_name: order.user.company_name,
        };
    });
};
const detail = async (params) => {
    const { id, user_id } = params;
    const order = await (0, typeorm_1.getRepository)(order_entity_1.Order)
        .createQueryBuilder('order')
        .where('order.id = :id', { id: id })
        .andWhere('order.user_id = :user_id', {
        user_id: user_id,
    })
        .getOne();
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
