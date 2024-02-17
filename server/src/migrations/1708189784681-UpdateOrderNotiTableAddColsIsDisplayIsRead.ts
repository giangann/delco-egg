import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateOrderNotiTableAddColsIsDisplayIsRead1708189784681
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('order_notification', [
      new TableColumn({
        name: 'is_read',
        type: 'tinyint',
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: 'is_display',
        type: 'tinyint',
        isNullable: true,
        default: 1,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('order_notification', ['is_read', 'is_display']);
  }
}
