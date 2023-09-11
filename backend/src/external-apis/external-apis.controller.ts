import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
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
  @ApiOkResponse({
    description: 'The weather data in the specified location and language',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests to the external API',
  })
  @CacheTTL(1000 * 60 * 15) // 15 minutes
  @UseInterceptors(BodyAwareCacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('weather')
  getWeather(@Body() data: WeatherDataDto) {
    return this.externalApisService.getWeather(data);
  }

  @ApiQuery({
    name: 'country',
    description: 'Country code',
    enum: COUNTRY_CODES,
  })
  @ApiOkResponse({
    description: 'The trending news in the specified country',
    type: TrendingNewsResultDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @CacheTTL(1000 * 60 * 5) // 5 minutes
  @UseInterceptors(CacheInterceptor)
  @HttpCode(HttpStatus.OK)
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
  @ApiOkResponse({
    description: 'Location found',
    type: CityLocationDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid access token',
  })
  @ApiTooManyRequestsResponse({
    description: 'Too many requests to the external API',
  })
  @CacheTTL(1000 * 60 * 60 * 24 * 30) // 1 month as cities and countries don't change location often
  @UseInterceptors(BodyAwareCacheInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('location')
  async getLocationForCoordinates(@Body() location: CoordinatesLocationDto) {
    return this.externalApisService.getLocationForCoordinates(location);
  }
}
