import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { APIRequest } from '../token-aware-cache.interceptor';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { UserSettingsUpdateDto } from './dto/user-settings-update.dto';

@UseGuards(JwtAuthGuard)
@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get()
  async getSelfUserSettings(@Req() { user: { email } }: APIRequest) {
    return this.userSettingsService.getSelfUserSettings(email);
  }

  @Patch()
  async updateSelfUserSettings(
    @Req() { user: { email } }: APIRequest,
    @Body() newSettings: UserSettingsUpdateDto,
  ) {
    return this.userSettingsService.updateSelfUserSettings(email, newSettings);
  }

  @Patch('reset')
  async resetUserSettings(@Req() { user: { email } }: APIRequest) {
    return this.userSettingsService.resetUserSettings(email);
  }
}
