import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { APIRequest } from '../token-aware-cache.interceptor';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { UserSettingsUpdateDto } from './dto/user-settings-update.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import UserSettings from './entities/user-settings.entity';

@ApiTags('User settings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @ApiResponse({
    status: '2XX',
    description: 'Current user settings',
    type: UserSettings,
  })
  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @Get()
  async getSelfUserSettings(@Req() { user: { email } }: APIRequest) {
    return this.userSettingsService.getUserSettings(email);
  }

  @ApiBody({
    description: 'New user settings',
    type: UserSettingsUpdateDto,
  })
  @ApiResponse({
    status: '2XX',
    description: 'Updated user settings',
    type: UserSettings,
  })
  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @Patch()
  async updateSelfUserSettings(
    @Req() { user: { email } }: APIRequest,
    @Body() newSettings: UserSettingsUpdateDto,
  ) {
    return this.userSettingsService.updateUserSettings(email, newSettings);
  }

  @ApiResponse({
    status: '2XX',
    description: 'Resetted user settings',
    type: UserSettings,
  })
  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @Patch('reset')
  async resetUserSettings(@Req() { user: { email } }: APIRequest) {
    return this.userSettingsService.resetUserSettings(email);
  }
}
