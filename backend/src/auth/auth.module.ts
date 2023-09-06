import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { EmployeesModule } from '../employees/employees.module'

@Module({
  imports: [EmployeesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
