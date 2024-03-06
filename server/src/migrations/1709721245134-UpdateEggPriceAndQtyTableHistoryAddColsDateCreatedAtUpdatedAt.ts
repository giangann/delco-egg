import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggPriceAndQtyTableHistoryAddColsDateCreatedAtUpdatedAt1709721245134
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('egg_price_qty_history', [
      new TableColumn({
        name: 'date',
        type: 'date',
      }),
      new TableColumn({
        name: 'createdAt',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('egg_price_qty_history', [
      'date',
      'createdAt',
      'updatedAt',
    ]);
  }
}
