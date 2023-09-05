import { IsJWT } from 'class-validator'

export default class LoginResultDto {
  @IsJWT()
  accessToken: string
}
