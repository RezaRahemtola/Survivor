import {
  Inject,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  MasuraoLongEmployeeDto,
  MasuraoShortEmployeeDto,
} from './dto/masurao-employee.dto';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { EmployeeLongDto, EmployeeShortDto } from './dto/employee.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import MockingJayEmployeeDto from './dto/mocking-jay-employee.dto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeesOfflineService implements OnApplicationBootstrap {
  constructor(
    private readonly userSettingsService: UserSettingsService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  onApplicationBootstrap() {
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') !== 'true')
      return;
    const content = fs.readFileSync(
      __dirname +
        '/../../../' +
        this.configService.getOrThrow('EMPLOYEES_MOCKING_JAY_FILE_PATH'),
    );
    const employees: MockingJayEmployeeDto[] = JSON.parse(content.toString());
    this.cacheManager
      .set('employees', employees)
      .then(() =>
        console.log(`${employees.length} Mocking Jay employees loaded`),
      )
      .catch((err) => console.error(err));
  }

  async getEmployeesShort(): Promise<EmployeeShortDto[]> {
    const employees =
      await this.cacheManager.get<MockingJayEmployeeDto[]>('employees');
    return Promise.all(
      employees.map(async ({ id, email, name, surname }) => {
        const { workPresence } =
          await this.userSettingsService.getUserSettings(email);
        return {
          id,
          email,
          name,
          surname,
          workPresence,
        };
      }),
    );
  }

  async getSelfEmployeeLong(email: string): Promise<EmployeeLongDto> {
    const employees =
      await this.cacheManager.get<MasuraoLongEmployeeDto[]>(`employees`);
    const employee = employees.find((e) => e.email === email);
    if (!employee) throw new NotFoundException('Employee not found');
    const { workPresence } =
      await this.userSettingsService.getUserSettings(email);
    return {
      ...employee,
      workPresence,
    };
  }

  async getEmployeeLong(id: number): Promise<EmployeeLongDto> {
    const employees =
      await this.cacheManager.get<MockingJayEmployeeDto[]>('employees');
    const employee = employees.find((e) => e.id === id);
    if (!employee) throw new NotFoundException('Employee not found');
    const { workPresence } = await this.userSettingsService.getUserSettings(
      employee.email,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { picture, ...employeeWithoutPicture } = employee;
    return {
      ...employeeWithoutPicture,
      workPresence,
    };
  }

  async getEmployeePicture(id: number): Promise<string> {
    const employees = (
      await this.cacheManager.get<MockingJayEmployeeDto[]>('employees')
    ).map(({ id, picture }) => ({ id, picture }));
    const employee = employees.find((e) => e.id === id);
    if (!employee) throw new NotFoundException('Employee not found');
    return employee.picture;
  }

  async getLeaders(): Promise<MasuraoShortEmployeeDto[]> {
    const employees =
      await this.cacheManager.get<MockingJayEmployeeDto[]>('employees');
    const { id, name, surname, email } = employees.find((e) => e.id === 1);
    return [
      {
        id,
        name,
        surname,
        email,
      },
    ];
  }
}
