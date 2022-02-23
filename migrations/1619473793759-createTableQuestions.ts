import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class createTableQuestions1619473793759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'exam_id',
            type: 'uuid',
          },
          {
            name: 'statement',
            type: 'varchar',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        columnNames: ['exam_id'],
        referencedTableName: 'exams',
        referencedColumnNames: ['id'],
      }),
    )

    await this.createInitialData(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions')
  }

  async createInitialData(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO questions (id, exam_id, statement) values('607b9974-4914-44df-81e8-d56ec6a58912', '607b9974-4914-44df-81e8-d56ec6a589bf', 'Qual o sentido da vida, do universo e tudo mais?')",
    )
  }
}
