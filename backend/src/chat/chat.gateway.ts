import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {
  Inject,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChatAuthGuard } from './chat-auth.guard';
import {
  DirectMessageSendDto,
  GlobalMessageSendDto,
} from './dto/message-send.dto';
import { JwtPayload } from '../auth/jwt.strategy';
import { BadRequestTransformationFilter } from './bad-request-transformation.filter';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthService } from 'src/auth/auth.service';
import { ChatMessagesService } from './chat-messages.service';

@UsePipes(new ValidationPipe())
@UseFilters(BadRequestTransformationFilter)
@UseGuards(ChatAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Socket;

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    @Inject(AuthService)
    private readonly authService: AuthService,
    private readonly chatMessagesService: ChatMessagesService,
  ) {}

  @SubscribeMessage('global-message')
  async handleGlobalMessage(
    @MessageBody()
    { message }: GlobalMessageSendDto,
    @MessageBody('user')
    { email }: JwtPayload,
  ) {
    this.server.emit('global-message', { sender: email, message });
    await this.chatMessagesService.saveMessage(message, email);
  }

  @SubscribeMessage('direct-message')
  async handleDirectMessage(
    @MessageBody()
    { message, receiver }: DirectMessageSendDto,
    @MessageBody('user')
    { email }: JwtPayload,
  ) {
    const clients = await this.cacheManager.get<Set<string>>(
      `e2is/${receiver}`,
    );
    await this.chatMessagesService.saveMessage(message, email, receiver);
    if (!clients) {
      return;
    }
    for (const client of clients) {
      this.server.to(client).emit('direct-message', {
        sender: email,
        message,
      });
    }
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.headers.authorization.split(' ')[1];
      const { email } = this.authService.verifyToken(token);
      const clients =
        (await this.cacheManager.get<Set<string>>(`e2is/${email}`)) ??
        new Set<string>();
      clients.add(client.id);
      await this.cacheManager.set(`e2is/${email}`, clients);
      await this.cacheManager.set(`i2e/${client.id}`, email);
    } catch (e) {
      client.emit('events', 'Invalid token');
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    const email = await this.cacheManager.get(`i2e/${client.id}`);
    let clientIds = [
      ...(await this.cacheManager.get<Set<string>>(`e2is/${email}`)),
    ];
    clientIds = clientIds.filter((clientId) => clientId !== client.id);
    if (clientIds.length === 0) await this.cacheManager.del(`e2is/${email}`);
    await this.cacheManager.del(`i2e/${client.id}`);
  }
}
