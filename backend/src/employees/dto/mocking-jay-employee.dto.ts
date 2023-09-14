import { MasuraoLongEmployeeDto } from './masurao-employee.dto';
import { IsBase64 } from 'class-validator';

export default class MockingJayEmployeeDto extends MasuraoLongEmployeeDto {
  @IsBase64()
  picture!: string;
}
