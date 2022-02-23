import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class OptionRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  id?: string

  @ApiProperty({ example: 'A' })
  @IsNotEmpty()
  @IsString()
  key: string

  @ApiProperty({ example: 'beber cafe' })
  @IsNotEmpty()
  @IsString()
  value: string

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  correct: boolean
}
