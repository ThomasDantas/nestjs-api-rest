import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class QuestionIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  id: string
}
