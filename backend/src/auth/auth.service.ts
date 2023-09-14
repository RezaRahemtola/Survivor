import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MasuraoLoginResultDto } from './dto/login-result.dto';
import MasuraoCredentialsDto from './dto/credentials.dto';
import { runHttpRequestWithData } from '../http';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { EmployeesService } from '../employees/employees.service';
import { EmployeesOfflineService } from '../employees/employees-offline.service';
import { ConfigService } from '@nestjs/config';
import { MasuraoShortEmployeeDto } from '../employees/dto/masurao-employee.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import MockingJayEmployeeDto from '../employees/dto/mocking-jay-employee.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly employeesService: EmployeesService,
    private readonly employeesOfflineService: EmployeesOfflineService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async logIn(
    credentials: MasuraoCredentialsDto,
  ): Promise<MasuraoLoginResultDto> {
    let masuraoToken: string;
    if (
      this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true'
    ) {
      if (
        !(
          await this.cacheManager.get<MockingJayEmployeeDto[]>('employees')
        ).find((employee) => employee.email === credentials.email)
      )
        throw new UnauthorizedException({
          detail: 'Invalid Email and Password combination.',
        });
      masuraoToken = 'mocking-jay-token';
    } else {
      const { access_token } = await runHttpRequestWithData<
        MasuraoLoginResultDto,
        MasuraoCredentialsDto
      >(this.httpService.axiosRef, 'post', '/employees/login', credentials);
      masuraoToken = access_token;
    }
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

  async isLeader(token: string, email: string): Promise<boolean> {
    let leaders: MasuraoShortEmployeeDto[];
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true')
      leaders = await this.employeesOfflineService.getLeaders();
    else leaders = await this.employeesService.getLeaders(token);

    return leaders.some((leader) => leader.email === email);
  }
}
