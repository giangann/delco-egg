import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggPriceAndQtyTableHistoryAddColId1709735029387
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'egg_price_qty_history',
      new TableColumn({
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('egg_price_qty_history', 'id');
  }
}
