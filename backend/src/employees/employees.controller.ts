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
import TokenAwareCacheInterceptor, {
  APIRequest,
} from '../token-aware-cache.interceptor';
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

@ApiBearerAuth()
@ApiTags('Employees')
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

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
    return this.employeesService.getEmployeesShort(masuraoToken);
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
  getSelfEmployee(@Req() { user: { masuraoToken } }: APIRequest) {
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
    return this.employeesService.getEmployeePicture(id, masuraoToken);
  }
}
