import {
  IsArray,
  IsDataURI,
  IsDateString,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ArticleSourceDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export default class TrendingNewsResultDto {
  @IsEnum(['ok', 'error'])
  status: 'ok' | 'error';

  @IsInt()
  @Min(0)
  totalResults: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticleDto)
  articles: ArticleDto[];
}

export class ArticleDto {
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ArticleSourceDto)
  source: ArticleSourceDto;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  url: string;

  @IsDataURI()
  urlToImage: string;

  @IsDateString()
  publishedAt: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
