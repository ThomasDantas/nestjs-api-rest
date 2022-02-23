import { MigrationInterface, QueryRunner, Table, TableCheck } from 'typeorm'

export class createTableExams1619471794846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.createTable(
      new Table({
        name: 'exams',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )

    await queryRunner.createCheckConstraint(
      'exams',
      new TableCheck({
        name: 'check_type',
        columnNames: ['type'],
        expression: "type IN ('ONLINE', 'OFFLINE')",
      }),
    )
    await this.createInitialData(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exams')
  }

  async createInitialData(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO exams (id, name, description, type) values('607b9974-4914-44df-81e8-d56ec6a589bf','prova AMARELA',  'Prova Completa', 'ONLINE')",
    )
  }
}
