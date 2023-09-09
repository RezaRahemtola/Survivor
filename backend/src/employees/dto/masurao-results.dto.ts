import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MasuraoShortEmployeeDto {
  @ApiProperty({
    description: 'ID of the employee',
  })
  @IsInt()
  @Min(1)
  id!: number;

  @ApiProperty({
    description: 'Email of the employee',
    example: 'name.surname@masurao.ext',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Name of the employee',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Surname of the employee',
    example: 'Smith',
  })
  @IsString()
  @IsNotEmpty()
  surname!: string;
}

export class MasuraoLongEmployeeDto extends MasuraoShortEmployeeDto {
  @ApiProperty({
    description: 'Birth date of the employee',
    example: '1970-01-01',
  })
  @IsDateString()
  birth_date!: Date;

  @ApiProperty({
    description: 'Gender of the employee',
    example: 'Male',
  })
  @Matches(/(?:Fem|M)ale/)
  gender!: string;

  @ApiProperty({
    description: 'IDs of the suboordinates of the employee',
    example: [2, 3],
  })
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  subordinates!: number[];
}
