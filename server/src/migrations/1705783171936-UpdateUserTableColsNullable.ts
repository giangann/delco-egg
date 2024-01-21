import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUserTable1705783171936
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const currCompanyNameCol = (
      await queryRunner.getTable('user')
    ).findColumnByName('company_name');
    const currNoteCol = (
      await queryRunner.getTable('user')
    ).findColumnByName('note');
    await queryRunner.changeColumns('user', [
      {
        oldColumn: currCompanyNameCol,
        newColumn: new TableColumn({
          name: 'company_name',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      },
      {
        oldColumn: currNoteCol,
        newColumn: new TableColumn({
          name: 'note',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const currCompanyNameCol = (
      await queryRunner.getTable('user')
    ).findColumnByName('company_name');
    const currNoteCol = (
      await queryRunner.getTable('user')
    ).findColumnByName('note');
    await queryRunner.changeColumns('user', [
      {
        oldColumn: currCompanyNameCol,
        newColumn: new TableColumn({
          name: 'company_name',
          type: 'varchar',
          length: '255',
          isNullable: false,
        }),
      },
      {
        oldColumn: currNoteCol,
        newColumn: new TableColumn({
          name: 'note',
          type: 'varchar',
          length: '255',
          isNullable: false,
        }),
      },
    ]);
  }
}
