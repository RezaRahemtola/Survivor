import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  MasuraoLongEmployeeDto,
  MasuraoShortEmployeeDto,
} from './dto/masurao-results.dto';
import {
  AUTHORIZED_AXIOS_CONFIGURATION,
  AUTHORIZED_HEADERS,
  runHttpRequest,
} from '../http';

@Injectable()
export class EmployeesService {
  constructor(private readonly httpService: HttpService) {}

  async getEmployeesShort(
    accessToken: string,
  ): Promise<MasuraoShortEmployeeDto[]> {
    return runHttpRequest<MasuraoShortEmployeeDto[]>(
      this.httpService.axiosRef,
      'get',
      '/employees',
      AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
    );
  }

  getSelfEmployeeLong(accessToken: string): Promise<MasuraoLongEmployeeDto> {
    return runHttpRequest<MasuraoLongEmployeeDto>(
      this.httpService.axiosRef,
      'get',
      '/employees/me',
      AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
    );
  }

  getEmployeeLong(
    id: number,
    accessToken: string,
  ): Promise<MasuraoLongEmployeeDto> {
    return runHttpRequest<MasuraoLongEmployeeDto>(
      this.httpService.axiosRef,
      'get',
      `/employees/${id}`,
      AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
    );
  }

  getEmployeePicture(id: number, accessToken: string): Promise<string> {
    console.log('Calling masurao API');
    return runHttpRequest<ArrayBuffer>(
      this.httpService.axiosRef,
      'get',
      `/employees/${id}/image`,
      {
        headers: {
          Accept: 'image/png',
          ...AUTHORIZED_HEADERS(accessToken),
        },
        responseType: 'arraybuffer',
      },
    )
      .then((data) => Buffer.from(data).toString('base64'))
      .catch(({ response: { data, status } }) => {
        throw new HttpException(data, status);
      });
  }

  getLeaders(accessToken: string): Promise<MasuraoShortEmployeeDto[]> {
    return runHttpRequest<MasuraoShortEmployeeDto[]>(
      this.httpService.axiosRef,
      'get',
      '/employees/leaders',
      AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
    );
  }
}
