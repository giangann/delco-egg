"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationTable1707789157032 = void 0;
const typeorm_1 = require("typeorm");
class CreateNotificationTable1707789157032 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'order_notification',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'to_user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'new_status',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'content',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
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
        await queryRunner.createForeignKey('order_notification', new typeorm_1.TableForeignKey({
            columnNames: ['to_user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('order_notification');
    }
}
exports.CreateNotificationTable1707789157032 = CreateNotificationTable1707789157032;
