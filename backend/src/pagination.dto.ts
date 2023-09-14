import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export default class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @IsInt()
  @IsPositive()
  take!: number;
}
