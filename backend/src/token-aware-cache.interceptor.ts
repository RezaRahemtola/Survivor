import { ExecutionContext, Injectable } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { RequestWithToken } from './jwt-validator.interceptor';

@Injectable()
export default class TokenAwareCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string | undefined {
    const request: RequestWithToken = context.switchToHttp().getRequest();
    const {
      user: { masuraoToken },
    } = request;
    if (!masuraoToken) return undefined;
    return `${request.url}_${masuraoToken}`;
  }
}
