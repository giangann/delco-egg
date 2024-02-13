import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateTableNotificationAddColOrderId1707810895732
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_notification',
      new TableColumn({
        name: 'order_id',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'order_notification',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order_notification', 'order_id');
  }
}
