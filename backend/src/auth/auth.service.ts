import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MasuraoLoginResultDto } from './dto/login-result.dto';
import MasuraoCredentialsDto from './dto/credentials.dto';
import { runHttpRequestWithData } from '../http';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async logIn(
    credentials: MasuraoCredentialsDto,
  ): Promise<MasuraoLoginResultDto> {
    const { access_token } = await runHttpRequestWithData<
      MasuraoLoginResultDto,
      MasuraoCredentialsDto
    >(this.httpService.axiosRef, 'post', '/employees/login', credentials);
    return {
      access_token,
    };
  }
}
