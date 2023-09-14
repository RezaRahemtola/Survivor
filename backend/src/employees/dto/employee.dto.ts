import {
  MasuraoLongEmployeeDto,
  MasuraoShortEmployeeDto,
} from './masurao-employee.dto';
import { IsEnum } from 'class-validator';
import {
  WORK_PRESENCES,
  WorkPresence,
} from '../../user-settings/entities/user-settings.entity';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeShortDto extends MasuraoShortEmployeeDto {
  @ApiProperty({
    description: 'Work presence of the employee',
    enum: WORK_PRESENCES,
  })
  @IsEnum(WORK_PRESENCES)
  workPresence!: WorkPresence;
}

export class EmployeeLongDto extends MasuraoLongEmployeeDto {
  @ApiProperty({
    description: 'Work presence of the employee',
    enum: WORK_PRESENCES,
  })
  @IsEnum(WORK_PRESENCES)
  workPresence!: WorkPresence;
}
