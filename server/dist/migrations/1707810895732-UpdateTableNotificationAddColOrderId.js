"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTableNotificationAddColOrderId1707810895732 = void 0;
const typeorm_1 = require("typeorm");
class UpdateTableNotificationAddColOrderId1707810895732 {
    async up(queryRunner) {
        await queryRunner.addColumn('order_notification', new typeorm_1.TableColumn({
            name: 'order_id',
            type: 'int',
            isNullable: false,
        }));
        await queryRunner.createForeignKey('order_notification', new typeorm_1.TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('order_notification', 'order_id');
    }
}
exports.UpdateTableNotificationAddColOrderId1707810895732 = UpdateTableNotificationAddColOrderId1707810895732;
