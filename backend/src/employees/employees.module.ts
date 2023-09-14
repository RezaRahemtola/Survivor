import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { EmployeesOfflineService } from './employees-offline.service';

@Module({
  imports: [UserSettingsModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesOfflineService],
  exports: [EmployeesService, EmployeesOfflineService],
})
export class EmployeesModule {}
