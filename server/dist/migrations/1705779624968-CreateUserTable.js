"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1705779624968 = void 0;
const typeorm_1 = require("typeorm");
class CreateUserTable1705779624968 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'user',
            // username, password, phone_number, fullname, company_name, note, *softdelete
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'username',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'fullname',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'company_name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'note',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'isDeleted',
                    type: 'tinyint',
                    default: '0',
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
            uniques: [
                {
                    columnNames: ['username'],
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('user');
    }
}
exports.CreateUserTable1705779624968 = CreateUserTable1705779624968;
