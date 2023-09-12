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
import MessageSendDto from './dto/message-send.dto';
import { JwtPayload } from '../auth/jwt.strategy';
import { BadRequestTransformationFilter } from './bad-request-transformation.filter';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { AuthService } from 'src/auth/auth.service';

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
  ) {}

  @SubscribeMessage('global-message')
  handleMessage(
    @MessageBody()
    { message }: MessageSendDto,
    @MessageBody('user')
    { email }: JwtPayload,
  ) {
    this.server.emit('global-message', { sender: email, message });
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
    await this.cacheManager.del(`e2is/${email}`);
    await this.cacheManager.del(`i2e/${client.id}`);
  }
}
