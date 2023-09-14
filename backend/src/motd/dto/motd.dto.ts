import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MotdDto {
  @ApiProperty({
    description: 'The message of the day',
  })
  @IsString()
  @IsNotEmpty()
  motd!: string;
}
