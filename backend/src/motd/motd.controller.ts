import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MotdService } from './motd.service';
import { MotdDto } from './dto/motd.dto';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { LeaderGuard } from '../leader.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Message of the day')
@UseGuards(JwtAuthGuard)
@Controller('motd')
export class MotdController {
  constructor(private readonly motdService: MotdService) {}

  @ApiOkResponse({
    description: 'Message of the day',
    type: MotdDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getMotd(): Promise<MotdDto> {
    return {
      motd: await this.motdService.getMotd(),
    };
  }

  @ApiOkResponse({
    description: 'Update the message of the day',
    type: MotdDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @ApiForbiddenResponse({
    description: 'Not a leader',
  })
  @ApiNotFoundResponse({
    description: 'Message of the day not found',
  })
  @UseGuards(LeaderGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  async updateMotd(@Body() { motd }: MotdDto): Promise<MotdDto> {
    return {
      motd: await this.motdService.updateMotd(motd),
    };
  }
}
