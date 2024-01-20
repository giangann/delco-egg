import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEggPriceAndQtyHistoryTable1705752394936
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
    await queryRunner.createForeignKey(
      'egg_price_qty_history',
      new TableForeignKey({
        columnNames: ['egg_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'egg',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('egg_price_qty_history');
  }
}
