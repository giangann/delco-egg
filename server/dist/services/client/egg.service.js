"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const egg_entity_1 = require("../../entities/egg/egg.entity");
const where = { isDeleted: false };
const list = async () => {
    return await (0, typeorm_1.getRepository)(egg_entity_1.Egg).find();
};
const listNotDeleted = async () => {
    return await (0, typeorm_1.getRepository)(egg_entity_1.Egg).find(where);
};
exports.default = {
    list,
    listNotDeleted,
};
