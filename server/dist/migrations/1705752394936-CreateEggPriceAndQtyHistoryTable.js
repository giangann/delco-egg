"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEggPriceAndQtyHistoryTable1705752394936 = void 0;
const typeorm_1 = require("typeorm");
class CreateEggPriceAndQtyHistoryTable1705752394936 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'egg_price_qty_history',
            // columns: egg_id, type_name, price_1, price_2, price_3, quantity, date
            // price can be null because bash script will run on midnight to update quantity (can be edit later)
            columns: [
                {
                    name: 'egg_id',
                    type: 'int',
                },
                {
                    name: 'price_1',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'price_2',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'price_3',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'date',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
        await queryRunner.createForeignKey('egg_price_qty_history', new typeorm_1.TableForeignKey({
            columnNames: ['egg_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'egg',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('egg_price_qty_history');
    }
}
exports.CreateEggPriceAndQtyHistoryTable1705752394936 = CreateEggPriceAndQtyHistoryTable1705752394936;
