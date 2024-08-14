"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggPriceAndQtyTableAddColsCreatedAtUpdatedAt1709720723657 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggPriceAndQtyTableAddColsCreatedAtUpdatedAt1709720723657 {
    async up(queryRunner) {
        await queryRunner.addColumns('egg_price_qty', [
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
        await queryRunner.dropColumns('egg_price_qty', [
            'createdAt',
            'updatedAt',
        ]);
    }
}
exports.UpdateEggPriceAndQtyTableAddColsCreatedAtUpdatedAt1709720723657 = UpdateEggPriceAndQtyTableAddColsCreatedAtUpdatedAt1709720723657;
