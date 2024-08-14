"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const order_notification_entity_1 = require("../../entities/order-notification/order-notification.entity");
const list = async (params) => {
    const notiRepo = (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti)
        .createQueryBuilder('order_notification')
        .leftJoinAndSelect('order_notification.from_user', 'from_user')
        .where('order_notification.to_user_id = :to_user_id', {
        to_user_id: params.to_user_id,
    });
    if (params.is_display) {
        notiRepo.andWhere('order_notification.is_display = :is_display', {
            is_display: params.is_display,
        });
    }
    if (params.order_id) {
        notiRepo.andWhere('order_notification.order_id = :order_id', {
            order_id: params.order_id,
        });
    }
    const listNotiData = await notiRepo.getMany();
    return listNotiData;
};
const create = async (params) => {
    const createOrderNotiData = await (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti).save({
        ...params,
    });
    return createOrderNotiData;
};
const update = async (params) => {
    const updatedNoti = await (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti).update({ id: params.id }, { ...params });
    return updatedNoti;
};
const detail = async (params) => {
    const detailNoti = await (0, typeorm_1.getRepository)(order_notification_entity_1.OrderNoti).findOne({
        ...params,
    });
    return detailNoti;
};
// const sendNotiToListUser = async (
//   from_user_id: number,
//   to_list_user: number[],
// ) => {
//     const sendNotiResult = Promise.all(to_list_user.map(async(userId)=>{
//         const createNotiData = await create()
//     }))
// };
exports.default = { list, create, update, detail };
