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
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import MasuraoErrorDto from '../error.dto';
import { EmployeeLongDto, EmployeeShortDto } from './dto/employee.dto';
import { APIRequest } from '../http';
import { MasuraoShortEmployeeDto } from './dto/masurao-results.dto';

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

  @ApiOkResponse({
    description: 'Employees that are leaders',
    type: MasuraoShortEmployeeDto,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @CacheTTL(1000 * 60 * 60) // 1 hour
  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('/leaders')
  getLeaders(@Req() { user: { masuraoToken } }: APIRequest) {
    return this.employeesService.getLeaders(masuraoToken);
  }
}
