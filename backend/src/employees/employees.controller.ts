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
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseGuards(JwtAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  getEmployees(@Req() { user: { masuraoToken } }: APIRequest) {
    return this.employeesService.getEmployeesShort(masuraoToken);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  getEmployee(
    @Param('id') id: number,
    @Req() { user: { masuraoToken } }: APIRequest,
  ) {
    return this.employeesService.getEmployeeLong(id, masuraoToken);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:id/picture')
  getEmployeePicture(
    @Param('id') id: number,
    @Req() { user: { masuraoToken } }: APIRequest,
  ) {
    return this.employeesService.getEmployeePicture(id, masuraoToken);
  }

  @UseInterceptors(TokenAwareCacheInterceptor)
  @Get('/me')
  getSelfEmployee(@Req() { user: { masuraoToken } }: APIRequest) {
    return this.employeesService.getSelfEmployeeLong(masuraoToken);
  }
}
