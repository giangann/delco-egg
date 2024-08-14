"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggPriceAndQtyTableHistoryAddColsDateCreatedAtUpdatedAt1709721245134 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggPriceAndQtyTableHistoryAddColsDateCreatedAtUpdatedAt1709721245134 {
    async up(queryRunner) {
        await queryRunner.addColumns('egg_price_qty_history', [
            new typeorm_1.TableColumn({
                name: 'date',
                type: 'date',
            }),
            new typeorm_1.TableColumn({
                name: 'createdAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
            }),
            new typeorm_1.TableColumn({
                name: 'updatedAt',
                type: 'datetime',
                default: 'CURRENT_TIMESTAMP',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('egg_price_qty_history', [
            'date',
            'createdAt',
            'updatedAt',
        ]);
    }
}
exports.UpdateEggPriceAndQtyTableHistoryAddColsDateCreatedAtUpdatedAt1709721245134 = UpdateEggPriceAndQtyTableHistoryAddColsDateCreatedAtUpdatedAt1709721245134;
