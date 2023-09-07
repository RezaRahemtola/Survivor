import { ExecutionContext, Injectable } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Injectable()
export default class BodyAwareCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const { body } = request;
    if (!body) return undefined;
    return `${request.url}_${JSON.stringify(body)}`;
  }
}
