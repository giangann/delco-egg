"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDetailTable1706251740409 = void 0;
const typeorm_1 = require("typeorm");
class CreateOrderDetailTable1706251740409 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'order_detail',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'order_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'egg_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'deal_price',
                        type: 'int',
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
            yield queryRunner.createForeignKeys('order_detail', [
                new typeorm_1.TableForeignKey({
                    columnNames: ['order_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'order',
                    onDelete: 'CASCADE',
                }),
                new typeorm_1.TableForeignKey({
                    columnNames: ['egg_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'egg',
                    onDelete: 'CASCADE',
                }),
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('order_detail');
        });
    }
}
exports.CreateOrderDetailTable1706251740409 = CreateOrderDetailTable1706251740409;
