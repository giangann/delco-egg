"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderTableAddColsReasonAndNote1706266766426 = void 0;
const typeorm_1 = require("typeorm");
class UpdateOrderTableAddColsReasonAndNote1706266766426 {
    async up(queryRunner) {
        await queryRunner.addColumns('order', [
            new typeorm_1.TableColumn({
                name: 'reason',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'note',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns('order', ['reason', 'note']);
    }
}
exports.UpdateOrderTableAddColsReasonAndNote1706266766426 = UpdateOrderTableAddColsReasonAndNote1706266766426;
