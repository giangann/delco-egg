"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const egg_entity_1 = require("../../entities/egg/egg.entity");
const typeorm_1 = require("typeorm");
const string_error_1 = require("../../errors/string.error");
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
const where = { isDeleted: false };
const create = async (params) => {
    const egg = new egg_entity_1.Egg();
    egg.type_name = params.type_name;
    egg.weight = params.weight;
    const createEggData = await (0, typeorm_1.getRepository)(egg_entity_1.Egg).save(egg);
    return createEggData;
};
const update = async (params) => {
    const egg = (0, typeorm_1.getRepository)(egg_entity_1.Egg).findOne({ id: params.id });
    if (!egg) {
        throw new string_error_1.StringError('Egg is not existed');
    }
    return await (0, typeorm_1.getRepository)(egg_entity_1.Egg).update({ id: params.id }, {
        type_name: params.type_name,
        weight: params.weight,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
};
const list = async (params) => {
    return await (0, typeorm_1.getRepository)(egg_entity_1.Egg).find(params);
};
const listNotDeleted = async () => {
    return await (0, typeorm_1.getRepository)(egg_entity_1.Egg).find(where);
};
const remove = async (params) => {
    const query = { id: params.id };
    const egg = await (0, typeorm_1.getRepository)(egg_entity_1.Egg).findOne(query);
    if (!egg) {
        throw new string_error_1.StringError('Egg is not existed');
    }
    const markAsDeletedRow = await (0, typeorm_1.getRepository)(egg_entity_1.Egg).update(query, {
        isDeleted: true,
    });
    return markAsDeletedRow;
};
exports.default = {
    create,
    update,
    list,
    remove,
    listNotDeleted,
};
