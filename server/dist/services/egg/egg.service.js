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
const egg_entity_1 = require("../../entities/egg/egg.entity");
const typeorm_1 = require("typeorm");
const string_error_1 = require("../../errors/string.error");
const date_time_utility_1 = __importDefault(require("../../utilities/date-time.utility"));
const create = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const egg = new egg_entity_1.Egg();
    egg.type_name = params.type_name;
    egg.weight = params.weight;
    const createEggData = yield typeorm_1.getRepository(egg_entity_1.Egg).save(egg);
    return createEggData;
});
const update = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const egg = typeorm_1.getRepository(egg_entity_1.Egg).findOne({ id: params.id });
    if (!egg) {
        throw new string_error_1.StringError('Egg is not existed');
    }
    return yield typeorm_1.getRepository(egg_entity_1.Egg).update({ id: params.id }, {
        type_name: params.type_name,
        weight: params.weight,
        updatedAt: date_time_utility_1.default.getCurrentTimeStamp(),
    });
});
const list = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getRepository(egg_entity_1.Egg).find();
});
const remove = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = { id: params.id };
    const egg = yield typeorm_1.getRepository(egg_entity_1.Egg).findOne(query);
    if (!egg) {
        throw new string_error_1.StringError('Egg is not existed');
    }
    return yield typeorm_1.getRepository(egg_entity_1.Egg).delete(Object.assign({}, query));
});
exports.default = {
    create,
    update,
    list,
    remove,
};
