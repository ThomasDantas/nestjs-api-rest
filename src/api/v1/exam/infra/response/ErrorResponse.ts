import { ApiProperty } from '@nestjs/swagger'

class BodyErrorResponse {
  @ApiProperty({
    description: 'Mensagem de erro',
  })
  message: string
}

export default class ErrorResponse {
  @ApiProperty({
    description: 'Código de status',
  })
  statusCode: number
  @ApiProperty({
    description: 'Objeto de erro',
  })
  body: BodyErrorResponse
}
