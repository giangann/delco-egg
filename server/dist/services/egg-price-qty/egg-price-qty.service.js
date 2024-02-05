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
const typeorm_1 = require("typeorm");
const egg_price_qty_entity_1 = require("../../entities/egg-price-qty/egg-price-qty.entity");
const string_error_1 = require("../../errors/string.error");
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield typeorm_1.getRepository(egg_price_qty_entity_1.EggPriceQty)
        .createQueryBuilder('egg_price_qty')
        .innerJoinAndSelect('egg_price_qty.egg', 'egg')
        .getMany();
    return data;
});
const update = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { egg_id: params.egg_id };
    const eggPriceQtyItem = yield typeorm_1.getRepository(egg_price_qty_entity_1.EggPriceQty).findOne(Object.assign({}, query));
    if (!eggPriceQtyItem)
        throw new string_error_1.StringError('item not existed');
    const updatedData = yield typeorm_1.getRepository(egg_price_qty_entity_1.EggPriceQty).update(query, Object.assign({}, params));
    return updatedData;
});
exports.default = { list, update };
