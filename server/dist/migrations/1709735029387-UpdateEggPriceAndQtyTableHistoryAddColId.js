"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggPriceAndQtyTableHistoryAddColId1709735029387 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggPriceAndQtyTableHistoryAddColId1709735029387 {
    async up(queryRunner) {
        await queryRunner.addColumn('egg_price_qty_history', new typeorm_1.TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('egg_price_qty_history', 'id');
    }
}
exports.UpdateEggPriceAndQtyTableHistoryAddColId1709735029387 = UpdateEggPriceAndQtyTableHistoryAddColId1709735029387;
