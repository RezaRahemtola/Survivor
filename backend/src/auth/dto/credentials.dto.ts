import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export default class MasuraoCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string

  @IsString()
  @IsNotEmpty()
  password!: string
}
