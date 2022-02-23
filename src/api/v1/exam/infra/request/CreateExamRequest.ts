import { IsEnum, IsNotEmpty, IsString, IsUppercase } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { ExamType } from '../../../../../infra/utils/types/type-exam'
import { ExamEnumType } from '../../../../../infra/utils/constants/type-exam.constant'

export class CreateExamRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({ enum: { type: 'ONLINE | OFFLINE' } })
  @IsEnum(ExamEnumType, { message: 'type must be an ONLINE | OFFLINE' })
  @IsUppercase()
  @IsNotEmpty()
  @IsString()
  type: ExamType
}
