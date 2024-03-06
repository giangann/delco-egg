import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggPriceAndQtyTableDelColDate1709720567236
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('egg_price_qty', 'date');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'egg_price_qty',
      new TableColumn({
        name: 'date',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }
}
