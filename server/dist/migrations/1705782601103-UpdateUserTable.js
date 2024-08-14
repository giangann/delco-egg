"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserTable1705782601103 = void 0;
const typeorm_1 = require("typeorm");
class UpdateUserTable1705782601103 {
    async up(queryRunner) {
        await queryRunner.addColumn('user', new typeorm_1.TableColumn({
            name: 'isAdmin',
            type: 'tinyint',
            default: '0',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('user', 'isAdmin');
    }
}
exports.UpdateUserTable1705782601103 = UpdateUserTable1705782601103;
