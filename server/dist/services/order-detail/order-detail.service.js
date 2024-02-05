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
Object.defineProperty(exports, "__esModule", { value: true });
const order_detail_entity_1 = require("../../entities/order-detail/order-detail.entity");
const typeorm_1 = require("typeorm");
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const createData = yield typeorm_1.getRepository(order_detail_entity_1.OrderDetail).save(Object.assign({}, params));
    return createData;
});
const getByOrderId = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderDetailRepo = typeorm_1.getRepository(order_detail_entity_1.OrderDetail)
        .createQueryBuilder('order_detail')
        .where('order_id = :orderId', { orderId: orderId })
        .leftJoinAndSelect('order_detail.egg', 'egg');
    const orderDetailDataById = yield orderDetailRepo.getMany();
    return orderDetailDataById;
});
exports.default = {
    create,
    getByOrderId,
};
