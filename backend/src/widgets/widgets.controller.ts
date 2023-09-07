import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import UserWidgetsUpdateDto from './dto/user-widgets-update.dto';
import { APIRequest } from '../token-aware-cache.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('widgets')
export class WidgetsController {
  constructor(private readonly widgetsService: WidgetsService) {}

  @Get()
  async getSelfUserWidgets(@Req() { user: { email } }: APIRequest) {
    return this.widgetsService.getSelfUserWidgets(email);
  }

  @Patch()
  async updateSelfUserWidgets(
    @Req() { user: { email } }: APIRequest,
    @Body() { newWidgetNames }: UserWidgetsUpdateDto,
  ) {
    return this.widgetsService.updateSelfUserWidgets(email, newWidgetNames);
  }

  @Get('available')
  async getAvailableWidgets(@Req() { user: { email } }: APIRequest) {
    return this.widgetsService.getAvailableWidgets(email);
  }
}
