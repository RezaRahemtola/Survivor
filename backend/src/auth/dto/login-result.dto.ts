import { IntersectionType } from '@nestjs/mapped-types';
import { IsBase64, IsJWT, IsNotEmpty } from 'class-validator';
import { MasuraoLongEmployeeDto } from '../../employees/dto/masurao-results.dto';

export class MasuraoLoginResultDto {
  @IsJWT()
  access_token!: string;
}

export class LoginResultDto extends IntersectionType(
  MasuraoLoginResultDto,
  MasuraoLongEmployeeDto,
) {
  @IsBase64()
  @IsNotEmpty()
  picture!: string;
}
