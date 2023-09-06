import { HttpException, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { MasuraoLongEmployeeDto, MasuraoShortEmployeeDto } from './dto/masurao-results.dto'
import { AUTHORIZED_AXIOS_CONFIGURATION, AUTHORIZED_HEADERS, runHttpRequest } from '../http'
import { EmployeesListOptionsDto } from './dto/requests-options.dto'

@Injectable()
export class EmployeesService {
  constructor(private readonly httpService: HttpService) {
  }

  async getEmployees(options: EmployeesListOptionsDto, accessToken: string): Promise<(MasuraoShortEmployeeDto & {
    picture?: string
  })[]> {
    const shortEmployees = await runHttpRequest<MasuraoShortEmployeeDto[]>(this.httpService.axiosRef, 'get', '/employees', AUTHORIZED_AXIOS_CONFIGURATION(accessToken))
    if (!options.withPictures)
      return shortEmployees
    return Promise.all(
      shortEmployees.map(async (employee) => ({
        ...employee,
        picture: await this.getEmployeePicture(employee.id, accessToken),
      })),
    )
  }

  getSelfEmployeeLong(accessToken: string): Promise<MasuraoLongEmployeeDto> {
    return runHttpRequest<MasuraoLongEmployeeDto>(this.httpService.axiosRef, 'get', '/employees/me', AUTHORIZED_AXIOS_CONFIGURATION(accessToken))
  }

  getEmployeeLong(id: number, accessToken: string): Promise<MasuraoLongEmployeeDto> {
    return runHttpRequest<MasuraoLongEmployeeDto>(this.httpService.axiosRef, 'get', `/employees/${id}`, AUTHORIZED_AXIOS_CONFIGURATION(accessToken))
  }

  getEmployeePicture(id: number, accessToken: string): Promise<string> {
    return runHttpRequest<ArrayBuffer>(this.httpService.axiosRef, 'get', `/employees/${id}/image`, {
      headers: {
        Accept: 'image/png',
        ...AUTHORIZED_HEADERS(accessToken),
      },
      responseType: 'arraybuffer',
    })
      .then(data => Buffer.from(data).toString('base64'))
      .catch(({response: {data, status}}) => {
        throw new HttpException(data, status)
      })
  }

  getLeaders(accessToken: string): Promise<MasuraoShortEmployeeDto[]> {
    return runHttpRequest<MasuraoShortEmployeeDto[]>(this.httpService.axiosRef, 'get', '/employees/leaders', AUTHORIZED_AXIOS_CONFIGURATION(accessToken))
  }
}
