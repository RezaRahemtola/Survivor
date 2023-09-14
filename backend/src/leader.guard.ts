import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { APIRequest } from './http';

@Injectable()
export class LeaderGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { masuraoToken, email } = context
      .switchToHttp()
      .getRequest<APIRequest>().user;
    return this.authService.isLeader(masuraoToken, email);
  }
}
