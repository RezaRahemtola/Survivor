import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import MasuraoErrorDto from '../error.dto';
import { EmployeeLongDto, EmployeeShortDto } from './dto/employee.dto';
import { APIRequest } from '../http';
import { EmployeesOfflineService } from './employees-offline.service';
import { ConfigService } from '@nestjs/config';
import { MasuraoShortEmployeeDto } from './dto/masurao-employee.dto';

@ApiBearerAuth()
@ApiTags('Employees')
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly employeesOfflineService: EmployeesOfflineService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOkResponse({
    description: 'List of the employees',
    type: EmployeeShortDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getEmployees(@Req() { user: { masuraoToken } }: APIRequest) {
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true')
      return this.employeesOfflineService.getEmployeesShort();
    return this.employeesService.getEmployeesShort(masuraoToken);
  }

  @ApiOkResponse({
    description: 'Employees that are leaders',
    type: MasuraoShortEmployeeDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/leaders')
  getLeaders(@Req() { user: { masuraoToken } }: APIRequest) {
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true')
      return this.employeesOfflineService.getLeaders();
    return this.employeesService.getLeaders(masuraoToken);
  }

  @ApiOkResponse({
    description: 'Employee details',
    type: EmployeeLongDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  getSelfEmployee(@Req() { user: { masuraoToken, email } }: APIRequest) {
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true')
      return this.employeesOfflineService.getSelfEmployeeLong(email);
    return this.employeesService.getSelfEmployeeLong(masuraoToken);
  }

  @ApiOkResponse({
    description: 'Employee details',
    type: EmployeeLongDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  getEmployee(
    @Param('id') id: number,
    @Req() { user: { masuraoToken } }: APIRequest,
  ) {
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true')
      return this.employeesOfflineService.getEmployeeLong(id);
    return this.employeesService.getEmployeeLong(id, masuraoToken);
  }

  @ApiOkResponse({
    description: 'Employee picture encoded in base64',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('/:id/picture')
  getEmployeePicture(
    @Param('id') id: number,
    @Req() { user: { masuraoToken } }: APIRequest,
  ) {
    if (this.configService.get<string>('MOCKING_JAY_MODE', 'false') === 'true')
      return this.employeesOfflineService.getEmployeePicture(id);
    return this.employeesService.getEmployeePicture(id, masuraoToken);
  }
}
