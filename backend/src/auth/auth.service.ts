import { HttpException, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { LoginResultDto, MasuraoLoginResultDto } from './dto/login-result.dto'
import MasuraoCredentialsDto from './dto/credentials.dto'
import { runHttpRequestWithData } from '../http'
import { EmployeesService } from '../employees/employees.service'

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService, private readonly employeesService: EmployeesService) {
  }

  async logIn(credentials: MasuraoCredentialsDto): Promise<LoginResultDto> {
    try {
      const {access_token} = await runHttpRequestWithData<MasuraoLoginResultDto, MasuraoCredentialsDto>(this.httpService.axiosRef, 'post', '/employees/login', credentials)
      const me = await this.employeesService.getSelfEmployeeLong(access_token)

      return {
        access_token,
        picture: await this.employeesService.getEmployeePicture(me.id, access_token),
        ...me,
      }
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status)
    }
  }
}
