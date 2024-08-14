"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNotificationTableAddColFromUserId1707795910345 = void 0;
const typeorm_1 = require("typeorm");
class UpdateNotificationTableAddColFromUserId1707795910345 {
    async up(queryRunner) {
        await queryRunner.addColumn('order_notification', new typeorm_1.TableColumn({
            name: 'from_user_id',
            type: 'int',
            isNullable: false,
        }));
        await queryRunner.createForeignKey('order_notification', new typeorm_1.TableForeignKey({
            columnNames: ['from_user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('order_notification', 'from_user_id');
    }
}
exports.UpdateNotificationTableAddColFromUserId1707795910345 = UpdateNotificationTableAddColFromUserId1707795910345;
