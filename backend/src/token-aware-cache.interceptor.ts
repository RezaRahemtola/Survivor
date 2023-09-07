import { ExecutionContext, Injectable } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

export type APIRequest = Request & {
  user: { masuraoToken: string; email: string };
};

@Injectable()
export default class TokenAwareCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string | undefined {
    const request: APIRequest = context.switchToHttp().getRequest();
    const {
      user: { masuraoToken },
    } = request;
    if (!masuraoToken) return undefined;
    return `${request.url}_${masuraoToken}`;
  }
}
