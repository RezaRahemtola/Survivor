import {
  Controller,
  Get,
  Headers,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  getEmployees(@Headers('Authorization') accessToken: string) {
    return this.employeesService.getEmployeesShort(accessToken.split(' ')[1]);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  getEmployee(
    @Param('id') id: number,
    @Headers('Authorization') accessToken: string,
  ) {
    return this.employeesService.getEmployeeLong(id, accessToken.split(' ')[1]);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:id/picture')
  getEmployeePicture(
    @Param('id') id: number,
    @Headers('Authorization') accessToken: string,
  ) {
    return this.employeesService.getEmployeePicture(
      id,
      accessToken.split(' ')[1],
    );
  }
}
