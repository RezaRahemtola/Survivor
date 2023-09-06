import { Module } from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { EmployeesController } from './employees.controller'

@Module({
  imports: [],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {
}
