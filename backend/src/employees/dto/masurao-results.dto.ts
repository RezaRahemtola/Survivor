import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const GENDERS = ['Male', 'Female'] as const;
export type Gender = (typeof GENDERS)[number];

export class MasuraoShortEmployeeDto {
  @ApiProperty({
    description: 'ID of the employee',
  })
  @IsInt()
  @Min(1)
  id!: number;

  @ApiProperty({
    description: 'Email of the employee',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Name of the employee',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Surname of the employee',
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
    enum: GENDERS,
  })
  @IsEnum(GENDERS)
  gender!: Gender;

  @ApiProperty({
    description: 'IDs of the suboordinates of the employee',
    example: [2, 3],
  })
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  subordinates!: number[];
}
