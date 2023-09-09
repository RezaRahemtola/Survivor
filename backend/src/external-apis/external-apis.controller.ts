import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExternalApisService } from './external-apis.service';
import {
  CityLocationDto,
  CoordinatesLocationDto,
  COUNTRY_CODES,
  CountryCode,
  WeatherDataDto,
} from './dto/location.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import BodyAwareCacheInterceptor from '../body-aware-cache.interceptor';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import TrendingNewsResultDto from './dto/trending-news-result.dto';

@ApiTags('External APIs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('external')
export class ExternalApisController {
  constructor(private readonly externalApisService: ExternalApisService) {}

  @ApiBody({
    description: 'Weather API parameters',
    type: WeatherDataDto,
  })
  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests to the external API',
  })
  @ApiCreatedResponse({
    description: 'The weather data in the specified location and language',
  })
  @CacheTTL(1000 * 60 * 15) // 15 minutes
  @UseInterceptors(BodyAwareCacheInterceptor)
  @Post('weather')
  getWeather(@Body() data: WeatherDataDto) {
    return this.externalApisService.getWeather(data);
  }

  @ApiQuery({
    name: 'country',
    description: 'Country code',
    enum: COUNTRY_CODES,
  })
  @ApiCreatedResponse({
    description: 'The trending news in the specified country',
    type: TrendingNewsResultDto,
  })
  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @CacheTTL(1000 * 60 * 5) // 5 minutes
  @UseInterceptors(CacheInterceptor)
  @Get('news')
  async getNews(@Query('country') countryCode: CountryCode) {
    if (!COUNTRY_CODES.includes(countryCode)) {
      throw new BadRequestException({
        message: ['Invalid country code'],
        error: 'Bad Request',
        statusCode: 400,
      });
    }
    return this.externalApisService.getNews(countryCode);
  }

  @ApiBody({
    description: 'GPS Coordinates',
    type: CoordinatesLocationDto,
  })
  @ApiCreatedResponse({
    description: 'Location found',
    type: CityLocationDto,
  })
  @ApiForbiddenResponse({
    description: 'Invalid access token',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests to the external API',
  })
  @CacheTTL(1000 * 60 * 60 * 24 * 30) // 1 month as cities and countries don't change location often
  @UseInterceptors(BodyAwareCacheInterceptor)
  @Post('location')
  async getLocationForCoordinates(@Body() location: CoordinatesLocationDto) {
    return this.externalApisService.getLocationForCoordinates(location);
  }
}
