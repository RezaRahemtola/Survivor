import { IsBoolean, IsOptional } from 'class-validator';

export class EmployeesListOptionsDto {
  @IsOptional()
  @IsBoolean()
  withPictures?: boolean;
}
