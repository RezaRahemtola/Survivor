import {
  CallHandler,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

export function validateJWT(accessToken: string): string | null {
  const matches = accessToken.match(
    /^Bearer\s+(eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]+)$/,
  );
  return matches && matches.length === 2 ? matches[1] : null;
}

export type RequestWithToken = Request & { token: string };

@Injectable()
export default class JwtValidatorInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const { authorization: accessToken } = context
      .switchToHttp()
      .getRequest().headers;

    if (!accessToken)
      throw new UnauthorizedException('No access token provided');
    const validatedAccessToken = validateJWT(accessToken);
    if (!validatedAccessToken)
      throw new UnauthorizedException('Invalid access token provided');
    context.switchToHttp().getRequest().token = validatedAccessToken;
    return next.handle();
  }
}
