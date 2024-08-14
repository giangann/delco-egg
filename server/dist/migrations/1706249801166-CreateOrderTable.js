"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderTable1706249801166 = void 0;
const typeorm_1 = require("typeorm");
const application_1 = __importDefault(require("../constants/application"));
class CreateOrderTable1706249801166 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'order',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'int',
                    isNullable: false,
                    default: application_1.default.status.WAITING_APPROVAL,
                },
                {
                    name: 'date',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'time',
                    type: 'time',
                    isNullable: false,
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
        await queryRunner.createForeignKey('order', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('order');
    }
}
exports.CreateOrderTable1706249801166 = CreateOrderTable1706249801166;
