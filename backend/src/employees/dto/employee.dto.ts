import { MasuraoLongEmployeeDto } from './masurao-results.dto'
import { IsEnum } from 'class-validator'
import { WORK_PRESENCES } from '../../user-settings/entities/user-settings.entity'

export class EmployeeDto extends MasuraoLongEmployeeDto {
  @IsEnum(WORK_PRESENCES)
}
