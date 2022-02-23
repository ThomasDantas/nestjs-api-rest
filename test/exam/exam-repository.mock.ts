import ExamEntity from '../../src/infra/adapter/database/entity/exam.entity'
import { NotFoundError } from '../../src/infra/http-response/http-exceptions'

export default class ExamRepositoryMock {
  static data: ExamEntity[] = [
    {
      id: 'e784f753-2b01-4604-96f2-c483bd3d8510',
      name: 'string',
      description: 'string',
      type: 'string',
    },
  ]

  static async store(exam: ExamEntity) {
    if (exam) return this.data[0]
  }

  static async getAll() {
    return this.data
  }

  static async updateById(examId: string, exam: ExamEntity): Promise<void> {
    const findById = await this.getById(examId)
    if (!findById) throw new NotFoundError('Exam not found')

    await this.store({ id: examId, ...exam })
  }

  static async deleteById(examId: string): Promise<void> {
    const findById = await this.getById(examId)
    if (!findById) throw new NotFoundError('Exam not found')

    this.data = this.data.filter((d) => d.id != examId)
  }

  static async getById(examId: string): Promise<ExamEntity> {
    const data = this.data.find((d) => d.id == examId)
    return data
  }
}
