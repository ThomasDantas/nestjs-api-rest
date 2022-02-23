import { NotFoundError } from '../../src/infra/http-response/http-exceptions'
import QuestionEntity from '../../src/infra/adapter/database/entity/question.entity'

export default class QuestionRepositoryMock {
  static data: QuestionEntity[] = [
    {
      id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
      statement: 'Qual o sentido da vida, do universo e tudo mais?',
      options: [
        {
          id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
          key: 'A',
          value: 'beber cafe',
          correct: true,
        },
      ],
    },
  ]

  static async store(question: QuestionEntity) {
    if (question) return this.data[0]
  }

  static async getAllByExamId(examId: string): Promise<QuestionEntity[]> {
    if (examId) return this.data
  }

  static async updateById(examId: string, statement: string): Promise<void> {
    const findById = await this.getById(examId)
    if (!findById) throw new NotFoundError('Question not found')

    await this.store({ id: examId, statement })
  }

  static async deleteById(questionId: string): Promise<void> {
    const findById = await this.getById(questionId)
    if (!findById) throw new NotFoundError('Question not found')

    this.data = this.data.filter((d) => d.id != questionId)
  }

  static async getById(examId: string): Promise<QuestionEntity> {
    const data = this.data.find((d) => d.id == examId)
    return data
  }
}
