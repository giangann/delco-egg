"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderNotiTableAddColsIsDisplayIsRead1708189784681 = void 0;
const typeorm_1 = require("typeorm");
class UpdateOrderNotiTableAddColsIsDisplayIsRead1708189784681 {
    async up(queryRunner) {
        await queryRunner.addColumns('order_notification', [
            new typeorm_1.TableColumn({
                name: 'is_read',
                type: 'tinyint',
                isNullable: true,
                default: 0,
            }),
            new typeorm_1.TableColumn({
                name: 'is_display',
                type: 'tinyint',
                isNullable: true,
                default: 1,
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('order_notification', ['is_read', 'is_display']);
    }
}
exports.UpdateOrderNotiTableAddColsIsDisplayIsRead1708189784681 = UpdateOrderNotiTableAddColsIsDisplayIsRead1708189784681;
