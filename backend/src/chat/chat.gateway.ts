import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatAuthGuard } from './chat-auth.guard';
import MessageSendDto from './dto/message-send.dto';
import { JwtPayload } from '../auth/jwt.strategy';
import { BadRequestTransformationFilter } from './bad-request-transformation.filter';

@UsePipes(new ValidationPipe())
@UseFilters(BadRequestTransformationFilter)
@UseGuards(ChatAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server!: Socket;

  @SubscribeMessage('global-message')
  handleMessage(
    @MessageBody()
    { message }: MessageSendDto,
    @MessageBody('user')
    { email }: JwtPayload,
  ) {
    this.server.emit('global-message', { sender: email, message });
  }
}
