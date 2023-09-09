import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MasuraoLoginResultDto {
  @ApiProperty({
    description: 'JWT access token',
  })
  @IsJWT()
  access_token!: string;
}
