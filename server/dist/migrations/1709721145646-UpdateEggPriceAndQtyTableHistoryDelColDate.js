"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggPriceAndQtyTableHistoryDelColDate1709721145646 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggPriceAndQtyTableHistoryDelColDate1709721145646 {
    async up(queryRunner) {
        await queryRunner.dropColumn('egg_price_qty_history', 'date');
    }
    async down(queryRunner) {
        await queryRunner.addColumn('egg_price_qty_history', new typeorm_1.TableColumn({
            name: 'date',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
        }));
    }
}
exports.UpdateEggPriceAndQtyTableHistoryDelColDate1709721145646 = UpdateEggPriceAndQtyTableHistoryDelColDate1709721145646;
