import {
  Controller,
  Get,
  Inject,
  Param,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import JwtValidatorInterceptor, {
  RequestWithToken,
} from '../jwt-validator.interceptor';
import TokenAwareCacheInterceptor from '../token-aware-cache.interceptor';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly employeesService: EmployeesService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @UseInterceptors(JwtValidatorInterceptor, TokenAwareCacheInterceptor)
  @Get()
  getEmployees(@Req() { token }: RequestWithToken) {
    return this.employeesService.getEmployeesShort(token);
  }

  @UseInterceptors(JwtValidatorInterceptor, TokenAwareCacheInterceptor)
  @Get('/:id')
  getEmployee(@Param('id') id: number, @Req() { token }: RequestWithToken) {
    return this.employeesService.getEmployeeLong(id, token);
  }

  @UseInterceptors(JwtValidatorInterceptor, TokenAwareCacheInterceptor)
  @Get('/:id/picture')
  getEmployeePicture(
    @Param('id') id: number,
    @Req() { token }: RequestWithToken,
  ) {
    return this.employeesService.getEmployeePicture(id, token);
  }
}
