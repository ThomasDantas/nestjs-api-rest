import { Injectable } from '@nestjs/common'
import { CreateQuestionRequest } from './infra/request/CreateQuestionRequest'
import { ExamIdRequest } from './infra/request/ExamIdRequest'
import { BadRequestError } from '../../../infra/http-response/http-exceptions'
import { QuestionRepository } from '../../../infra/adapter/database/repository/question.repository'
import { OptionRepository } from '../../../infra/adapter/database/repository/option.repository'
import QuestionMapper from './infra/mappers/question.mapper'
import { CreatedQuestionOkReponse } from './infra/response/CreatedQuestionOkResponse'
import { QuestionIdRequest } from './infra/request/QuestionIdRequest'

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly optionRepository: OptionRepository,
  ) {}

  async createQuestions(
    examId: ExamIdRequest,
    createQuestionRequest: CreateQuestionRequest,
  ): Promise<CreatedQuestionOkReponse> {
    const { statement, options } = createQuestionRequest

    if (!options.length)
      throw new BadRequestError('options should not be empty')

    const createQuestion = await this.questionRepository.store({
      examId: examId.id,
      statement,
    })

    const arrayOptions = []
    for (const element in options) {
      const option = options[element]
      const createOption = await this.optionRepository.store({
        questionId: createQuestion.id,
        ...option,
      })
      const { id, key, value, correct } = createOption
      arrayOptions.push({ id, key, value, correct })
    }
    const { id } = createQuestion
    const objectQuestion = {
      id,
      statement,
      options: arrayOptions,
    }
    return QuestionMapper.CreatedQuestionResponse(objectQuestion)
  }

  async getAllByExam(
    examId: ExamIdRequest,
  ): Promise<CreatedQuestionOkReponse[]> {
    const questions = await this.questionRepository.getAllByExamId(examId.id)
    for (const element in questions) {
      const elementQuestion = questions[element]
      elementQuestion.options = elementQuestion.options.sort(
        () => Math.random() - 0.5,
      )
    }
    return QuestionMapper.mapEntitiesExamResponse(questions)
  }

  async updateQuestionById(
    questionId: QuestionIdRequest,
    createQuestionRequest: CreateQuestionRequest,
  ): Promise<void> {
    const { statement, options } = createQuestionRequest

    if (!options.length)
      throw new BadRequestError('options should not be empty')

    await this.questionRepository.updateById(questionId.id, statement)

    for (const element in options) {
      const option = options[element]
      await this.optionRepository.updateById(option.id, option)
    }
  }

  async deleteQuestionById(questionId: QuestionIdRequest): Promise<void> {
    await this.questionRepository.deleteById(questionId.id)
  }
}
