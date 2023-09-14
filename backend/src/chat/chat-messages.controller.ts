import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { ChatMessagesService } from './chat-messages.service';
import PaginationDto from '../pagination.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { APIRequest } from '../http';

@ApiTags('Chat Messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class ChatMessagesController {
  constructor(private readonly chatMessagesService: ChatMessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getMessages(@Query() pagination: PaginationDto) {
    return this.chatMessagesService.getMessages(pagination);
  }

  @ApiParam({
    name: 'email',
    description: 'The email of the other user to get direct messages from',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:email')
  async getDirectMessagesFromEmail(
    @Param('email') otherUserEmail: string,
    @Query() pagination: PaginationDto,
    @Req() { user: { email: userEmail } }: APIRequest,
  ) {
    return this.chatMessagesService.getDirectMessagesFromEmail(
      userEmail,
      otherUserEmail,
      pagination,
    );
  }
}
