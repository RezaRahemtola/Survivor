import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import MasuraoCredentialsDto from './dto/credentials.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MasuraoLoginResultDto } from './dto/login-result.dto';
import MasuraoErrorDto from '../error.dto';

@ApiTags('Authentification')
@ApiProduces('application/json')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    description: 'Masurao credentials of the user',
    type: MasuraoCredentialsDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
    type: MasuraoErrorDto,
  })
  @ApiOkResponse({
    description: 'User successfully authorized in',
    type: MasuraoLoginResultDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  logIn(@Body() credentials: MasuraoCredentialsDto) {
    return this.authService.logIn(credentials);
  }
}
