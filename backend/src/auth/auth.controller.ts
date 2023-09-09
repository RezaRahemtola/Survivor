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
  })
  @ApiCreatedResponse({
    description: 'User successfully authorized in',
  })
  @Post('login')
  logIn(@Body() credentials: MasuraoCredentialsDto) {
    return this.authService.logIn(credentials);
  }
}
