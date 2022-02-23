import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class OptionResponse {
  @ApiProperty()
  @IsString()
  id?: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  correct: boolean
}
