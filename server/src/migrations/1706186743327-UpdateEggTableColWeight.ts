import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateEggTableColWeight1706186743327
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const currEggWeightCol = (
      await queryRunner.getTable('egg')
    ).findColumnByName('weight');

    const newEggWeightCol = new TableColumn({
      name: 'weight',
      type: 'varchar',
      length: '255',
      isNullable: false,
    });
    await queryRunner.changeColumn(
      'egg',
      currEggWeightCol,
      newEggWeightCol,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const currEggWeightCol = (
      await queryRunner.getTable('egg')
    ).findColumnByName('weight');

    const oldEggWeightCol = new TableColumn({
      name: 'weight',
      type: 'int',
      isNullable: false,
    });
    await queryRunner.changeColumn(
      'egg',
      currEggWeightCol,
      oldEggWeightCol,
    );
  }
}
