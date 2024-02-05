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
exports.UpdateEggTableColWeight1706186743327 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggTableColWeight1706186743327 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const currEggWeightCol = (yield queryRunner.getTable('egg')).findColumnByName('weight');
            const newEggWeightCol = new typeorm_1.TableColumn({
                name: 'weight',
                type: 'varchar',
                length: '255',
                isNullable: false,
            });
            yield queryRunner.changeColumn('egg', currEggWeightCol, newEggWeightCol);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const currEggWeightCol = (yield queryRunner.getTable('egg')).findColumnByName('weight');
            const oldEggWeightCol = new typeorm_1.TableColumn({
                name: 'weight',
                type: 'int',
                isNullable: false,
            });
            yield queryRunner.changeColumn('egg', currEggWeightCol, oldEggWeightCol);
        });
    }
}
exports.UpdateEggTableColWeight1706186743327 = UpdateEggTableColWeight1706186743327;
