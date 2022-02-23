import { EntityRepository, getManager, Repository } from 'typeorm'
import {
  NotFoundError,
  ServerError,
} from 'src/infra/http-response/http-exceptions'
import ExamEntity from '../entity/exam.entity'

@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {
  async store(exam: ExamEntity): Promise<ExamEntity> {
    try {
      return await this.save(exam)
    } catch (e) {
      throw new ServerError()
    }
  }

  async getAll(): Promise<ExamEntity[]> {
    try {
      return await this.find({
        order: { createdAt: 'ASC' },
      })
    } catch (e) {
      throw new ServerError()
    }
  }

  async updateById(examId: string, exam: ExamEntity): Promise<void> {
    try {
      const findById = await this.findOne({ where: { id: examId } })
      if (!findById) throw new NotFoundError('Exam not found')

      await this.save({ id: examId, ...exam })
    } catch (e) {
      if (e instanceof NotFoundError) throw e
      throw new ServerError()
    }
  }

  async deleteById(examId: string): Promise<void> {
    try {
      const findById = await this.findOne({ where: { id: examId } })
      if (!findById) throw new NotFoundError('Exam not found')

      await this.findOptionsByExamIdAndRemove(examId)
      await this.deleteQuestion(examId)
      await this.deleteExam(examId)
    } catch (e) {
      if (e instanceof NotFoundError) throw e
      throw new ServerError()
    }
  }

  private async findOptionsByExamIdAndRemove(examId: string) {
    const questions = await getManager().query(
      'SELECT id FROM questions WHERE exam_id = $1',
      [examId],
    )

    await questions.map(async (question) => {
      await this.deleteOption(question.id)
    })
  }

  private async deleteOption(examId: string) {
    await getManager().query('DELETE FROM options WHERE question_id = $1', [
      examId,
    ])
  }

  private async deleteQuestion(examId: string) {
    await getManager().query('DELETE FROM questions WHERE exam_id = $1', [
      examId,
    ])
  }

  private async deleteExam(examId: string) {
    await getManager().query('DELETE FROM exams WHERE id = $1', [examId])
  }
}
