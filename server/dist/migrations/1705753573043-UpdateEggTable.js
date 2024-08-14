"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggTable1705753573043 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggTable1705753573043 {
    async up(queryRunner) {
        await queryRunner.addColumn('egg', new typeorm_1.TableColumn({
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('egg', 'updatedAt');
    }
}
exports.UpdateEggTable1705753573043 = UpdateEggTable1705753573043;
