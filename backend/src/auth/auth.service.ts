import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import LoginResultDto from './dto/login-result.dto'
import CredentialsDto from './dto/credentials.dto'

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {
  }

  logIn({email, password}: CredentialsDto): LoginResultDto {
    return this.httpService.post<LoginResultDto>('/login', {email, password}, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
