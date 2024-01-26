import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateOrderTableAddColsReasonAndNote1706266766426
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('order', [
      new TableColumn({
        name: 'reason',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
      new TableColumn({
        name: 'note',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('order', ['reason', 'note']);
  }
}
