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
exports.UpdateUserTable1705783171936 = void 0;
const typeorm_1 = require("typeorm");
class UpdateUserTable1705783171936 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const currCompanyNameCol = (yield queryRunner.getTable('user')).findColumnByName('company_name');
            const currNoteCol = (yield queryRunner.getTable('user')).findColumnByName('note');
            yield queryRunner.changeColumns('user', [
                {
                    oldColumn: currCompanyNameCol,
                    newColumn: new typeorm_1.TableColumn({
                        name: 'company_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    }),
                },
                {
                    oldColumn: currNoteCol,
                    newColumn: new typeorm_1.TableColumn({
                        name: 'note',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    }),
                },
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const currCompanyNameCol = (yield queryRunner.getTable('user')).findColumnByName('company_name');
            const currNoteCol = (yield queryRunner.getTable('user')).findColumnByName('note');
            yield queryRunner.changeColumns('user', [
                {
                    oldColumn: currCompanyNameCol,
                    newColumn: new typeorm_1.TableColumn({
                        name: 'company_name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    }),
                },
                {
                    oldColumn: currNoteCol,
                    newColumn: new typeorm_1.TableColumn({
                        name: 'note',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    }),
                },
            ]);
        });
    }
}
exports.UpdateUserTable1705783171936 = UpdateUserTable1705783171936;
