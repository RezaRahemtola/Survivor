import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class MasuraoCredentialsDto {
  @ApiProperty({
    description: 'Email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
