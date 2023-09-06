import { Controller, Get, Param, Req, UseInterceptors } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import JwtValidatorInterceptor, {
  RequestWithToken,
} from '../jwt-validator.interceptor';
import TokenAwareCacheInterceptor from '../token-aware-cache.interceptor';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

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

  @UseInterceptors(JwtValidatorInterceptor, TokenAwareCacheInterceptor)
  @Get('/me')
  getSelfEmployee(@Req() { token }: RequestWithToken) {
    return this.employeesService.getSelfEmployeeLong(token);
  }
}
