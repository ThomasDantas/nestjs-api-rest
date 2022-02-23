import { ApiProperty } from '@nestjs/swagger'
import { CreatedExamOkReponse } from './CreatedExamOkResponse'

export default class CreatedExamBodyObjectResponse {
  @ApiProperty({
    description: 'Código de status',
  })
  statusCode: number
  @ApiProperty({
    type: CreatedExamOkReponse,
    description: 'Object exam created',
  })
  body: CreatedExamOkReponse
}
