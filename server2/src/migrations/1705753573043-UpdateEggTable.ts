import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggTable1705753573043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'egg',
      new TableColumn({
        name: 'updatedAt',
        type: 'datetime',
        default: 'CURRENT_TIMESTAMP',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('egg', 'updatedAt');
  }
}
