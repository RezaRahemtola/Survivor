import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class MasuraoErrorDto {
  @ApiProperty({
    description: 'Error message',
  })
  @IsString()
  @IsNotEmpty()
  detail!: string;
}
