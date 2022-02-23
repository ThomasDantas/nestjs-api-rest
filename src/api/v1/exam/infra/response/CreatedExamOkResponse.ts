import { ApiProperty } from '@nestjs/swagger'

export class CreatedExamOkReponse {
  constructor(id: string, name: string, description: string, type: string) {
    this.id = id
    this.name = name
    this.description = description
    this.type = type
  }

  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  type: string
}
