"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const egg_price_qty_entity_1 = require("../../entities/egg-price-qty/egg-price-qty.entity");
const list = async () => {
    const data = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty)
        .createQueryBuilder('egg_price_qty')
        .innerJoinAndSelect('egg_price_qty.egg', 'egg')
        .getMany();
    return data;
};
const create = async (params) => {
    const createdData = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty).save({
        ...params,
    });
    return createdData;
};
const update = async (params) => {
    const query = { egg_id: params.egg_id };
    const eggPriceQtyItem = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty).findOne({
        ...query,
    });
    let updatedOrCreatedData;
    if (!eggPriceQtyItem) {
        updatedOrCreatedData = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty).save({
            ...params,
        });
    }
    updatedOrCreatedData = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty).update(query, {
        ...params,
    });
    return updatedOrCreatedData;
};
const remove = async (params) => {
    const deletedRow = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty).delete({
        ...params,
    });
    return deletedRow;
};
const byEggId = async (egg_id) => {
    try {
        const eggPriceQty = await (0, typeorm_1.getRepository)(egg_price_qty_entity_1.EggPriceQty).findOne({
            egg_id: egg_id,
        });
        return eggPriceQty;
    }
    catch (e) {
        return null;
    }
};
exports.default = { list, create, update, remove, byEggId };
