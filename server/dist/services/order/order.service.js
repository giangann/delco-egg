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
const typeorm_1 = require("typeorm");
const order_entity_1 = require("../../entities/order/order.entity");
const string_error_1 = require("../../errors/string.error");
const order_detail_service_1 = __importDefault(require("../order-detail/order-detail.service"));
const list = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const orderRepo = typeorm_1.getRepository(order_entity_1.Order).createQueryBuilder('order');
    orderRepo.leftJoinAndSelect('order.items', 'item');
    // if is admin, can get all
    if (!params.user_id) {
        orderRepo.leftJoinAndSelect('order.user', 'user');
    }
    // if is user, just get order of that user
    if (params.user_id) {
        orderRepo.andWhere('order.user_id = :user_id', {
            user_id: params.user_id,
        });
    }
    const listOrders = yield orderRepo.getMany();
    return listOrders.map((order) => {
        return Object.assign(Object.assign({}, order), { username: order.user.username, fullname: order.user.fullname, phone_number: order.user.phone_number, company_name: order.user.company_name });
    });
});
const detail = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, user_id } = params;
    const orderRepo = typeorm_1.getRepository(order_entity_1.Order)
        .createQueryBuilder('order')
        .where('order.id = :id', { id: id });
    // orderRepo.leftJoinAndSelect('order.items', 'item');
    // if is admin, can get all
    if (!user_id) {
        orderRepo.leftJoinAndSelect('order.user', 'user');
    }
    // if is user, just get order of that user
    if (user_id) {
        orderRepo.andWhere('order.user_id = :user_id', {
            user_id: user_id,
        });
    }
    const order = yield orderRepo.getOne();
    const itemsByOrderId = yield order_detail_service_1.default.getByOrderId(id);
    order.items = itemsByOrderId;
    return order;
});
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new order_entity_1.Order();
    order.date = params.date;
    order.time = params.time;
    order.user_id = params.user_id;
    order.status = params.status;
    order.items = params.items;
    const createdOrder = yield typeorm_1.getRepository(order_entity_1.Order).save(order);
    return createdOrder;
});
const updateStatus = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield typeorm_1.getRepository(order_entity_1.Order).findOne({ id: params.id });
    if (!order)
        throw new string_error_1.StringError('Order not exists');
    const updateData = yield typeorm_1.getRepository(order_entity_1.Order).update({ id: params.id }, Object.assign({}, params));
    return updateData;
});
const rejectOrCancelOrder = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield typeorm_1.getRepository(order_entity_1.Order).findOne({ id: params.id });
    if (!order)
        throw new string_error_1.StringError('Order not exists');
    const updateData = yield typeorm_1.getRepository(order_entity_1.Order).update({ id: params.id }, Object.assign({}, params));
    return updateData;
});
const update = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield typeorm_1.getRepository(order_entity_1.Order).findOne({ id: params.id });
    if (!order)
        throw new string_error_1.StringError('Order not exists');
    const updateData = yield typeorm_1.getRepository(order_entity_1.Order).update({ id: params.id }, Object.assign({}, params));
    return updateData;
});
exports.default = {
    list,
    create,
    updateStatus,
    update,
    rejectOrCancelOrder,
    detail,
};
