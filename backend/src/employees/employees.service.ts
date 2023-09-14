import { Inject, Injectable } from '@nestjs/common';
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
import { UserSettingsService } from '../user-settings/user-settings.service';
import { EmployeeLongDto, EmployeeShortDto } from './dto/employee.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userSettingsService: UserSettingsService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async getEmployeesShort(accessToken: string): Promise<EmployeeShortDto[]> {
    let employees =
      await this.cacheManager.get<MasuraoShortEmployeeDto[]>('employees');
    if (!employees) {
      employees = await runHttpRequest<MasuraoShortEmployeeDto[]>(
        this.httpService.axiosRef,
        'get',
        '/employees',
        AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
      );
      await this.cacheManager.set('employees', employees, 1000 * 60 * 15); // 15 minutes
    }
    return Promise.all(
      employees.map(async (employee) => {
        const { workPresence } = await this.userSettingsService.getUserSettings(
          employee.email,
        );
        return {
          ...employee,
          workPresence,
        };
      }),
    );
  }

  async getSelfEmployeeLong(accessToken: string): Promise<EmployeeLongDto> {
    let employee = await this.cacheManager.get<MasuraoLongEmployeeDto>(
      `selfEmployee/${accessToken}`,
    );
    if (!employee) {
      employee = await runHttpRequest<MasuraoLongEmployeeDto>(
        this.httpService.axiosRef,
        'get',
        '/employees/me',
        AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
      );
      await this.cacheManager.set(
        `selfEmployee/${accessToken}`,
        employee,
        1000 * 60 * 15,
      ); // 15 minutes
    }
    const { workPresence } = await this.userSettingsService.getUserSettings(
      employee.email,
    );
    return {
      ...employee,
      workPresence,
    };
  }

  async getEmployeeLong(
    id: number,
    accessToken: string,
  ): Promise<EmployeeLongDto> {
    let employee = await this.cacheManager.get<MasuraoLongEmployeeDto>(
      `employee/${id}`,
    );
    if (!employee) {
      employee = await runHttpRequest<MasuraoLongEmployeeDto>(
        this.httpService.axiosRef,
        'get',
        `/employees/${id}`,
        AUTHORIZED_AXIOS_CONFIGURATION(accessToken),
      );
      await this.cacheManager.set(`employee/${id}`, employee, 1000 * 60 * 15); // 15 minutes
    }
    const { workPresence } = await this.userSettingsService.getUserSettings(
      employee.email,
    );
    return {
      ...employee,
      workPresence,
    };
  }

  async getEmployeePicture(id: number, accessToken: string): Promise<string> {
    let picture = await runHttpRequest<ArrayBuffer>(
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
    );
    return Buffer.from(picture).toString('base64');
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
