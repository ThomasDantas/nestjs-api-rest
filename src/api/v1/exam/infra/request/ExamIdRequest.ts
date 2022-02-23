import { IsNotEmpty, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ExamIdRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  id: string
}
