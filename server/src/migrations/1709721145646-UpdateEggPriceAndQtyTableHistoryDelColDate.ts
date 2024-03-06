import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggPriceAndQtyTableHistoryDelColDate1709721145646
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('egg_price_qty_history', 'date');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'egg_price_qty_history',
      new TableColumn({
        name: 'date',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }
}
