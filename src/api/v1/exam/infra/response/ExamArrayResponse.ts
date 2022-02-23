import { ApiProperty } from '@nestjs/swagger'
import { CreatedExamOkReponse } from './CreatedExamOkResponse'

export default class ExamBodyArrayResponse {
  @ApiProperty({
    description: 'Código de status',
  })
  statusCode: number
  @ApiProperty({
    type: [CreatedExamOkReponse],
    description: 'Array Object exam',
  })
  body: [CreatedExamOkReponse]
}
