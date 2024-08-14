"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserTable1705783171936 = void 0;
const typeorm_1 = require("typeorm");
class UpdateUserTable1705783171936 {
    async up(queryRunner) {
        const currCompanyNameCol = (await queryRunner.getTable('user')).findColumnByName('company_name');
        const currNoteCol = (await queryRunner.getTable('user')).findColumnByName('note');
        await queryRunner.changeColumns('user', [
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
    }
    async down(queryRunner) {
        const currCompanyNameCol = (await queryRunner.getTable('user')).findColumnByName('company_name');
        const currNoteCol = (await queryRunner.getTable('user')).findColumnByName('note');
        await queryRunner.changeColumns('user', [
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
    }
}
exports.UpdateUserTable1705783171936 = UpdateUserTable1705783171936;
