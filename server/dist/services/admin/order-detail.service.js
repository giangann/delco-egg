"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_detail_entity_1 = require("../../entities/order-detail/order-detail.entity");
const typeorm_1 = require("typeorm");
const create = async (params) => {
    const createData = await (0, typeorm_1.getRepository)(order_detail_entity_1.OrderDetail).save({
        ...params,
    });
    return createData;
};
const getByOrderId = async (orderId) => {
    const orderDetailRepo = (0, typeorm_1.getRepository)(order_detail_entity_1.OrderDetail)
        .createQueryBuilder('order_detail')
        .where('order_id = :orderId', { orderId: orderId })
        .leftJoinAndSelect('order_detail.egg', 'egg');
    const orderDetailDataById = await orderDetailRepo.getMany();
    return orderDetailDataById;
};
exports.default = {
    create,
    getByOrderId,
};
