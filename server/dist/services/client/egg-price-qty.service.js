"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const egg_price_qty_entity_1 = require("../../entities/egg-price-qty/egg-price-qty.entity");
const list = async () => {
    const data = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty)
        .createQueryBuilder('egg_price_qty')
        .innerJoinAndSelect('egg_price_qty.egg', 'egg')
        .andWhere('price_1 IS NOT NULL')
        .getMany();
    return data;
};
exports.default = { list };
