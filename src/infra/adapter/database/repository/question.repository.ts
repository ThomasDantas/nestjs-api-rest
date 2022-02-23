import { EntityRepository, getManager, Repository } from 'typeorm'
import {
  NotFoundError,
  ServerError,
} from 'src/infra/http-response/http-exceptions'
import QuestionEntity from '../entity/question.entity'

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
  async store(question: QuestionEntity): Promise<QuestionEntity> {
    try {
      return await this.save(question)
    } catch (e) {
      throw new ServerError()
    }
  }

  async getAllByExamId(examId: string): Promise<QuestionEntity[]> {
    try {
      return this.find({
        where: { examId: examId },
        relations: ['options'],
      })
    } catch (e) {
      throw new ServerError()
    }
  }

  async updateById(questionId: string, statement: string): Promise<void> {
    try {
      const findById = await this.findOne({ where: { id: questionId } })
      if (!findById) throw new NotFoundError('Question not found')

      await this.save({ id: questionId, statement })
    } catch (e) {
      if (e instanceof NotFoundError) throw e
      throw new ServerError()
    }
  }

  async deleteById(questionId: string): Promise<void> {
    try {
      const findById = await this.findOne({ where: { id: questionId } })
      if (!findById) throw new NotFoundError('Question not found')

      await this.deleteOption(questionId)
      await this.deleteQuestion(questionId)
    } catch (e) {
      if (e instanceof NotFoundError) throw e
      throw new ServerError()
    }
  }

  private async deleteOption(examId: string) {
    await getManager().query('DELETE FROM options WHERE question_id = $1', [
      examId,
    ])
  }

  private async deleteQuestion(examId: string) {
    await getManager().query('DELETE FROM questions WHERE id = $1', [examId])
  }
}
