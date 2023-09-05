import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import LoginResultDto from './dto/login-result.dto'
import CredentialsDto from './dto/credentials.dto'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {
  }

  async logIn({email, password}: CredentialsDto): Promise<LoginResultDto> {
    return (await firstValueFrom(this.httpService.post<LoginResultDto>('/employees/login', {email, password}, {
      headers: {
        'Content-Type': 'application/json',
      },
    }))).data
  }
}
