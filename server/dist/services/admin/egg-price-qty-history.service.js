"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const egg_price_qty_history_entity_1 = require("../../entities/egg-price-qty-history/egg-price-qty-history.entity");
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
const create = async (params) => {
    const createdData = await (0, typeorm_1.getRepository)(egg_price_qty_history_entity_1.EggPriceQtyHistory).save({
        ...params,
        createdAt: date_time_utility_1.default.getCurrentTimeStamp(),
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
    return createdData;
};
const list = async (params) => {
    const repo = (0, typeorm_1.getRepository)(egg_price_qty_history_entity_1.EggPriceQtyHistory).createQueryBuilder('egg_price_qty_history');
    repo.leftJoinAndSelect('egg_price_qty_history.egg', 'egg');
    const eggId = params.egg_id;
    if (eggId) {
        repo.andWhere('egg_price_qty_history.egg_id =:eggId', { eggId });
    }
    const date = params.date;
    if (date) {
        repo.andWhere('egg_price_qty_history.date =:date', { date });
    }
    const startDate = params.startDate;
    if (startDate) {
        repo.andWhere('egg_price_qty_history.date >= :startDate', {
            startDate,
        });
    }
    const endDate = params.endDate;
    if (endDate) {
        repo.andWhere('egg_price_qty_history.date <= :endDate', {
            endDate,
        });
    }
    const data = await repo.getMany();
    return data;
};
const update = async (params) => {
    return await (0, typeorm_1.getRepository)(egg_price_qty_history_entity_1.EggPriceQtyHistory).update({ egg_id: params.egg_id, date: params.date }, {
        ...params,
        createdAt: date_time_utility_1.default.getCurrentTimeStamp(),
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
};
exports.default = { create, list, update };
