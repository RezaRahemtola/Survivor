import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import MasuraoCredentialsDto from './dto/credentials.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiProduces,
  ApiTags,
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
  @ApiForbiddenResponse({
    description: 'Invalid credentials',
    type: MasuraoErrorDto,
  })
  @ApiCreatedResponse({
    description: 'User successfully authorized in',
    type: MasuraoLoginResultDto,
  })
  @Post('login')
  logIn(@Body() credentials: MasuraoCredentialsDto) {
    return this.authService.logIn(credentials);
  }
}
