import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { APIRequest } from '../token-aware-cache.interceptor';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { UserSettingsUpdateDto } from './dto/user-settings-update.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import UserSettings from './entities/user-settings.entity';

@ApiTags('User settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @ApiOkResponse({
    description: 'Current user settings',
    type: UserSettings,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getSelfUserSettings(@Req() { user: { email } }: APIRequest) {
    return this.userSettingsService.getUserSettings(email);
  }

  @ApiBody({
    description: 'New user settings',
    type: UserSettingsUpdateDto,
  })
  @ApiOkResponse({
    description: 'Updated user settings',
    type: UserSettings,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @HttpCode(HttpStatus.OK)
  @Patch()
  async updateSelfUserSettings(
    @Req() { user: { email } }: APIRequest,
    @Body() newSettings: UserSettingsUpdateDto,
  ) {
    return this.userSettingsService.updateUserSettings(email, newSettings);
  }

  @ApiOkResponse({
    description: 'Resetted user settings',
    type: UserSettings,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('reset')
  async resetUserSettings(@Req() { user: { email } }: APIRequest) {
    return this.userSettingsService.resetUserSettings(email);
  }
}
