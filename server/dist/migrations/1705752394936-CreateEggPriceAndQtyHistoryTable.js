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
exports.CreateEggPriceAndQtyHistoryTable1705752394936 = void 0;
const typeorm_1 = require("typeorm");
class CreateEggPriceAndQtyHistoryTable1705752394936 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'egg_price_qty_history',
                // columns: egg_id, type_name, price_1, price_2, price_3, quantity, date
                // price can be null because bash script will run on midnight to update quantity (can be edit later)
                columns: [
                    {
                        name: 'egg_id',
                        type: 'int',
                    },
                    {
                        name: 'price_1',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'price_2',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'price_3',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'datetime',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }));
            yield queryRunner.createForeignKey('egg_price_qty_history', new typeorm_1.TableForeignKey({
                columnNames: ['egg_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'egg',
                onDelete: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('egg_price_qty_history');
        });
    }
}
exports.CreateEggPriceAndQtyHistoryTable1705752394936 = CreateEggPriceAndQtyHistoryTable1705752394936;
