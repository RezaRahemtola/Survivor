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
import { ApiProperty } from '@nestjs/swagger';

export class ArticleSourceDto {
  @ApiProperty({
    description: 'ID of the article source',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'Name of the article source',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default class TrendingNewsResultDto {
  @ApiProperty({
    description: 'Status of the request',
    enum: ['ok', 'error'],
  })
  @IsEnum(['ok', 'error'])
  status: 'ok' | 'error';

  @ApiProperty({
    description: 'Total number of results',
  })
  @IsInt()
  @Min(0)
  totalResults: number;

  @ApiProperty({
    description: 'Array of articles',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticleDto)
  articles: ArticleDto[];
}

export class ArticleDto {
  @ApiProperty({
    description: 'Source of the article',
  })
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ArticleSourceDto)
  source: ArticleSourceDto;

  @ApiProperty({
    description: "Author's of the article",
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Title of the article',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the article',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'URL of the article',
  })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'URL of the image of the article',
  })
  @IsDataURI()
  urlToImage: string;

  @ApiProperty({
    description: 'Date of publishing of the article',
  })
  @IsDateString()
  publishedAt: string;

  @ApiProperty({
    description: 'Content of the article',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
