import { ApiProperty } from '@nestjs/swagger'
import { OptionResponse } from './OptionResponse'

export class CreatedQuestionOkReponse {
  constructor(id: string, statement: string, options: OptionResponse[]) {
    this.id = id
    this.statement = statement
    this.options = options
  }

  @ApiProperty()
  id: string

  @ApiProperty()
  statement: string

  @ApiProperty({ type: [OptionResponse] })
  options: OptionResponse[]
}
