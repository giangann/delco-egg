"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEggTable1705740518944 = void 0;
const typeorm_1 = require("typeorm");
class CreateEggTable1705740518944 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'egg',
            // columns: id, type_name, weight, createdAt
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'type_name',
                    type: 'varchar',
                    length: '20',
                    isNullable: false,
                },
                {
                    name: 'weight',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('egg');
    }
}
exports.CreateEggTable1705740518944 = CreateEggTable1705740518944;
