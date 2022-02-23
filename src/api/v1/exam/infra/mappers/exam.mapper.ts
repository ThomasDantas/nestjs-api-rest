import { CreatedExamOkReponse } from '../response/CreatedExamOkResponse'
import ExamEntity from '../../../../../infra/adapter/database/entity/exam.entity'

export default class ExamMapper {
  static CreatedExamResponse(exam: ExamEntity): CreatedExamOkReponse {
    const { id, name, description, type } = exam
    return new CreatedExamOkReponse(id, name, description, type)
  }

  static mapEntitiesExamResponse(
    entities: ExamEntity[],
  ): CreatedExamOkReponse[] {
    return entities.map((entity) => this.mapEntityToOkResponse(entity))
  }

  static mapEntityToOkResponse(entity: ExamEntity): CreatedExamOkReponse {
    return this.CreatedExamResponse(entity)
  }
}
