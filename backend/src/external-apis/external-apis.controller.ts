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
  CoordinatesLocationDto,
  COUNTRY_CODES,
  CountryAndCityLocationDto,
  CountryCode,
} from './dto/location.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import BodyAwareCacheInterceptor from '../body-aware-cache.interceptor';

@UseGuards(JwtAuthGuard)
@Controller('external')
export class ExternalApisController {
  constructor(private readonly externalApisService: ExternalApisService) {}

  @CacheTTL(1000 * 60 * 15) // 15 minutes
  @UseInterceptors(BodyAwareCacheInterceptor)
  @Post('weather')
  getWeather(@Body() countryAndCity: CountryAndCityLocationDto) {
    return this.externalApisService.getWeather(countryAndCity);
  }

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

  @CacheTTL(1000 * 60 * 60 * 24 * 30) // 1 month as cities and countries don't change location often
  @UseInterceptors(BodyAwareCacheInterceptor)
  @Post('location')
  async getLocationForCoordinates(@Body() location: CoordinatesLocationDto) {
    return this.externalApisService.getLocationForCoordinates(location);
  }
}
