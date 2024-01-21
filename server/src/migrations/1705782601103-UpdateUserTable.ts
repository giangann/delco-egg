import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserTable1705782601103
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'isAdmin',
        type: 'tinyint',
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'isAdmin');
  }
}
