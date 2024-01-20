import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEggTable1705740518944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'egg',
        // columns: id, type_name, weight, createdAt
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type_name',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'weight',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('egg');
  }
}
