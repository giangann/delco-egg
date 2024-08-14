"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggTableColWeight1706186743327 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggTableColWeight1706186743327 {
    async up(queryRunner) {
        const currEggWeightCol = (await queryRunner.getTable('egg')).findColumnByName('weight');
        const newEggWeightCol = new typeorm_1.TableColumn({
            name: 'weight',
            type: 'varchar',
            length: '255',
            isNullable: false,
        });
        await queryRunner.changeColumn('egg', currEggWeightCol, newEggWeightCol);
    }
    async down(queryRunner) {
        const currEggWeightCol = (await queryRunner.getTable('egg')).findColumnByName('weight');
        const oldEggWeightCol = new typeorm_1.TableColumn({
            name: 'weight',
            type: 'int',
            isNullable: false,
        });
        await queryRunner.changeColumn('egg', currEggWeightCol, oldEggWeightCol);
    }
}
exports.UpdateEggTableColWeight1706186743327 = UpdateEggTableColWeight1706186743327;
