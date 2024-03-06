import {
    MigrationInterface,
    QueryRunner,
    TableColumn
} from 'typeorm';

export class UpdateEggTableAddColIsDeleted1709695956752
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'egg',
      new TableColumn({
        name: 'isDeleted',
        type: 'tinyint',
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('egg', 'isDeleted');
  }
}
