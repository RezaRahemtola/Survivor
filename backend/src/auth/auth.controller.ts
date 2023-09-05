import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import CredentialsDto from './dto/credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  logIn(@Body() credentials: CredentialsDto) {
    return this.authService.logIn(credentials)
  }
}
