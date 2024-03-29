import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateEggPriceAndQtyTable1705749450064
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'egg_price_qty',
        // columns: egg_id, type_name, price_1, price_2, price_3, quantity, date
        // price can be null because bash script will run on midnight to update quantity (can be edit later)
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'egg_id',
            type: 'int',
            isUnique: true,
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
      'egg_price_qty',
      new TableForeignKey({
        columnNames: ['egg_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'egg',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('egg_price_qty');
  }
}
