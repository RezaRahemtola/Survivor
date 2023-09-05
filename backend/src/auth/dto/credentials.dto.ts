import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class CredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
