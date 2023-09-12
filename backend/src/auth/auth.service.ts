import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MasuraoLoginResultDto } from './dto/login-result.dto';
import MasuraoCredentialsDto from './dto/credentials.dto';
import { runHttpRequestWithData } from '../http';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async logIn(
    credentials: MasuraoCredentialsDto,
  ): Promise<MasuraoLoginResultDto> {
    const { access_token: masuraoToken } = await runHttpRequestWithData<
      MasuraoLoginResultDto,
      MasuraoCredentialsDto
    >(this.httpService.axiosRef, 'post', '/employees/login', credentials);
    const access_token = this.jwtService.sign({
      masuraoToken,
      email: credentials.email,
    });
    return {
      access_token,
    };
  }

  verifyToken(token: string): JwtPayload | undefined {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return undefined;
    }
  }
}
