"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const order_notification_entity_1 = require("../../entities/order-notification/order-notification.entity");
const list = async (params) => {
    const to_user_id = params.to_user_id;
    const order_id = params.order_id;
    const orderNotiRepo = (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti).createQueryBuilder('order_notification');
    orderNotiRepo.leftJoinAndSelect('order_notification.from_user', 'from_user');
    if (to_user_id) {
        orderNotiRepo.where('to_user_id = :user_id', {
            user_id: to_user_id,
        });
    }
    if (order_id) {
        orderNotiRepo.andWhere('order_id = :order_id', {
            order_id: order_id,
        });
    }
    const listNotiData = await orderNotiRepo.getMany();
    return listNotiData;
};
const create = async (params) => {
    try {
        const createOrderNotiData = await (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti).save({
            ...params,
        });
        return createOrderNotiData;
    }
    catch (e) {
        return false;
    }
};
const createMany = async (listParams) => {
    const sendNotiResult = await Promise.all(listParams.map(async (params) => {
        const createNotiData = await create(params);
        return createNotiData;
    }));
    return sendNotiResult;
};
const update = async (params) => {
    const updatedNoti = await (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti).update({ id: params.id }, { ...params });
    return updatedNoti;
};
exports.default = { list, create, createMany, update };
