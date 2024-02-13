import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateNotificationTableAddColFromUserId1707795910345
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order_notification',
      new TableColumn({
        name: 'from_user_id',
        type: 'int',
        isNullable: false,
      }),
    );
    await queryRunner.createForeignKey(
      'order_notification',
      new TableForeignKey({
        columnNames: ['from_user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order_notification', 'from_user_id');
  }
}
