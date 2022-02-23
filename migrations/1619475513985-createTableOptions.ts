import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class createTableOptions1619475513985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'options',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'question_id',
            type: 'uuid',
          },
          {
            name: 'key',
            type: 'varchar',
            length: '1',
          },
          {
            name: 'value',
            type: 'varchar',
          },
          {
            name: 'correct',
            type: 'boolean',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'options',
      new TableForeignKey({
        columnNames: ['question_id'],
        referencedTableName: 'questions',
        referencedColumnNames: ['id'],
      }),
    )

    await this.createInitialData(queryRunner)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('options')
  }

  async createInitialData(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO options (id, question_id, key, value, correct) values('607b9974-4914-44df-81e8-d56ec6a58951','607b9974-4914-44df-81e8-d56ec6a58912', 'a', 'viver', 'false')",
    )
    await queryRunner.query(
      "INSERT INTO options (id, question_id, key, value, correct) values('607b9974-4914-44df-81e8-d56ec6a58952','607b9974-4914-44df-81e8-d56ec6a58912', 'b', 'codar', 'false')",
    )
    await queryRunner.query(
      "INSERT INTO options (id, question_id, key, value, correct) values('607b9974-4914-44df-81e8-d56ec6a58953','607b9974-4914-44df-81e8-d56ec6a58912', 'c', 'beber cafe', 'false')",
    )
    await queryRunner.query(
      "INSERT INTO options (id, question_id, key, value, correct) values('607b9974-4914-44df-81e8-d56ec6a58954','607b9974-4914-44df-81e8-d56ec6a58912', 'd', 'aprender & aprender', 'true')",
    )
  }
}
