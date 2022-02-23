import QuestionEntity from '../../../../../infra/adapter/database/entity/question.entity'
import { CreatedQuestionOkReponse } from '../response/CreatedQuestionOkResponse'

export default class QuestionMapper {
  static CreatedQuestionResponse(
    question: QuestionEntity,
  ): CreatedQuestionOkReponse {
    const { id, statement, options } = question
    return new CreatedQuestionOkReponse(id, statement, options)
  }

  static mapEntitiesExamResponse(
    entities: QuestionEntity[],
  ): CreatedQuestionOkReponse[] {
    return entities.map((entity) => this.mapEntityToOkResponse(entity))
  }

  static mapEntityToOkResponse(
    entity: QuestionEntity,
  ): CreatedQuestionOkReponse {
    return this.CreatedQuestionResponse(entity)
  }
}
