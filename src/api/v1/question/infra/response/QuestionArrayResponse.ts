import { ApiProperty } from '@nestjs/swagger'
import { CreatedQuestionOkReponse } from './CreatedQuestionOkResponse'

export default class ExamBodyArrayResponse {
  @ApiProperty({
    description: 'Código de status',
  })
  statusCode: number
  @ApiProperty({
    type: [CreatedQuestionOkReponse],
    description: 'Array Object question',
  })
  body: [CreatedQuestionOkReponse]
}
