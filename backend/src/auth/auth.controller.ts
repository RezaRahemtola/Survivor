import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import MasuraoCredentialsDto from './dto/credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  logIn(@Body() credentials: MasuraoCredentialsDto) {
    return this.authService.logIn(credentials)
  }
}
