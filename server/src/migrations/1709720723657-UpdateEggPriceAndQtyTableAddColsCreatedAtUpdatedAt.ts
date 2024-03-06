import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggPriceAndQtyTableAddColsCreatedAtUpdatedAt1709720723657
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('egg_price_qty', [
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
    await queryRunner.dropColumns('egg_price_qty', [
      'createdAt',
      'updatedAt',
    ]);
  }
}
