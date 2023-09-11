import {
  Controller,
  Get,
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
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MasuraoShortEmployeeDto } from './dto/masurao-results.dto';
import MasuraoErrorDto from '../error.dto';
import { EmployeeLongDto } from './dto/employee.dto';

@ApiBearerAuth()
@ApiTags('Employees')
@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @ApiOkResponse({
    description: 'List of the employees',
    type: MasuraoShortEmployeeDto,
    isArray: true,
  })
  @UseInterceptors(CacheInterceptor)
  @Get()
  getEmployees(@Req() { user: { masuraoToken } }: APIRequest) {
    return this.employeesService.getEmployeesShort(masuraoToken);
  }

  @ApiForbiddenResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @ApiOkResponse({
    description: 'Employee details',
    type: EmployeeLongDto,
  })
  @CacheTTL(1000 * 60 * 15) // 15 minutes
  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  getEmployee(
    @Param('id') id: number,
    @Req() { user: { masuraoToken } }: APIRequest,
  ) {
    return this.employeesService.getEmployeeLong(id, masuraoToken);
  }

  @ApiForbiddenResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @ApiOkResponse({
    description: 'Employee picture encoded in base64',
    type: String,
  })
  @UseInterceptors(CacheInterceptor)
  @Get('/:id/picture')
  getEmployeePicture(
    @Param('id') id: number,
    @Req() { user: { masuraoToken } }: APIRequest,
  ) {
    return this.employeesService.getEmployeePicture(id, masuraoToken);
  }

  @ApiForbiddenResponse({
    description: 'Invalid access token',
    type: MasuraoErrorDto,
  })
  @ApiOkResponse({
    description: 'Employee details',
    type: EmployeeLongDto,
  })
  @CacheTTL(1000 * 60 * 15) // 15 minutes
  @UseInterceptors(TokenAwareCacheInterceptor)
  @Get('/me')
  getSelfEmployee(@Req() { user: { masuraoToken } }: APIRequest) {
    return this.employeesService.getSelfEmployeeLong(masuraoToken);
  }
}
