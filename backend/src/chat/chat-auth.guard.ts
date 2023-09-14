import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { JwtPayload } from '../auth/jwt.strategy';

@Injectable()
export class ChatAuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<any> {
    try {
      const token = context
        .switchToWs()
        .getClient<Socket>()
        .handshake.headers.authorization.split(' ')[1];
      const { masuraoToken, email } = this.authService.verifyToken(token);
      context
        .switchToWs()
        .getData<Record<PropertyKey, any> & { user: JwtPayload }>().user = {
        masuraoToken,
        email,
      };
      return true;
    } catch (e) {
      return false;
    }
  }
}
