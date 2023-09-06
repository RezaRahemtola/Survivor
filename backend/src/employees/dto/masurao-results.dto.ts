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

export class MasuraoShortEmployeeDto {
  @IsInt()
  @Min(1)
  id!: number;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  surname!: string;
}

export class MasuraoLongEmployeeDto extends MasuraoShortEmployeeDto {
  @IsDateString()
  birth_date!: Date;

  @Matches(/(?:Fem|M)ale/)
  gender!: string;

  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  subordinates!: number[];
}
