import { Body, Controller, Get, Headers, Param, UseInterceptors } from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { EmployeesListOptionsDto } from './dto/requests-options.dto'
import { CacheInterceptor } from '@nestjs/cache-manager'

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {
  }

  @UseInterceptors(CacheInterceptor)
  @Get()
  getEmployees(
    @Body() options: EmployeesListOptionsDto,
    @Headers('Authorization') accessToken: string,
  ) {
    return this.employeesService.getEmployeesShort(options, accessToken.split(' ')[1])
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  getEmployee(
    @Param('id') id: number,
    @Headers('Authorization') accessToken: string,
  ) {
    return this.employeesService.getEmployeeLong(id, accessToken.split(' ')[1])
  }
}
