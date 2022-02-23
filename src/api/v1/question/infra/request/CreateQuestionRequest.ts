import { IsArray, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { OptionRequest } from './OptionRequest'

export class CreateQuestionRequest {
  @ApiProperty({
    example: 'Qual o sentido da vida, do universo e tudo mais?',
  })
  @IsNotEmpty()
  @IsString()
  statement: string

  @ApiProperty({ type: [OptionRequest] })
  @IsNotEmpty()
  @IsArray()
  options: OptionRequest[]
}
