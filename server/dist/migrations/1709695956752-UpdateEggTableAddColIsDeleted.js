"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEggTableAddColIsDeleted1709695956752 = void 0;
const typeorm_1 = require("typeorm");
class UpdateEggTableAddColIsDeleted1709695956752 {
    async up(queryRunner) {
        await queryRunner.addColumn('egg', new typeorm_1.TableColumn({
            name: 'isDeleted',
            type: 'tinyint',
            default: '0',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('egg', 'isDeleted');
    }
}
exports.UpdateEggTableAddColIsDeleted1709695956752 = UpdateEggTableAddColIsDeleted1709695956752;
