"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDetailTable1706251740409 = void 0;
const typeorm_1 = require("typeorm");
class CreateOrderDetailTable1706251740409 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'order_detail',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'order_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'egg_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'quantity',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'deal_price',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
        await queryRunner.createForeignKeys('order_detail', [
            new typeorm_1.TableForeignKey({
                columnNames: ['order_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'order',
                onDelete: 'CASCADE',
            }),
            new typeorm_1.TableForeignKey({
                columnNames: ['egg_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'egg',
                onDelete: 'CASCADE',
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('order_detail');
    }
}
exports.CreateOrderDetailTable1706251740409 = CreateOrderDetailTable1706251740409;
