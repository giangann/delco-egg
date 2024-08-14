"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggPriceAndQtyTableDelColDate1709720567236 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggPriceAndQtyTableDelColDate1709720567236 {
    async up(queryRunner) {
        await queryRunner.dropColumn('egg_price_qty', 'date');
    }
    async down(queryRunner) {
        await queryRunner.addColumn('egg_price_qty', new typeorm_1.TableColumn({
            name: 'date',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
        }));
    }
}
exports.UpdateEggPriceAndQtyTableDelColDate1709720567236 = UpdateEggPriceAndQtyTableDelColDate1709720567236;
