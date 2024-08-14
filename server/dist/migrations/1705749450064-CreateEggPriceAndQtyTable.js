"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEggPriceAndQtyTable1705749450064 = void 0;
const typeorm_1 = require("typeorm");
class CreateEggPriceAndQtyTable1705749450064 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'egg_price_qty',
            // columns: egg_id, type_name, price_1, price_2, price_3, quantity, date
            // price can be null because bash script will run on midnight to update quantity (can be edit later)
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'egg_id',
                    type: 'int',
                    isUnique: true,
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
        await queryRunner.createForeignKey('egg_price_qty', new typeorm_1.TableForeignKey({
            columnNames: ['egg_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'egg',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('egg_price_qty');
    }
}
exports.CreateEggPriceAndQtyTable1705749450064 = CreateEggPriceAndQtyTable1705749450064;
