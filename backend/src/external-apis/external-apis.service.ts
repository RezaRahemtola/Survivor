import { Injectable } from '@nestjs/common';
import { runHttpRequest } from '../http';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import TrendingNewsResultDto from './dto/trending-news-result.dto';
import {
  CityLocationDto,
  CoordinatesLocationDto,
  CountryCode,
  WeatherDataDto,
} from './dto/location.dto';

@Injectable()
export class ExternalApisService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getWeather({ country, city, language }: WeatherDataDto) {
    const apiKey = this.configService.getOrThrow<string>('WEATHER_API_KEY');
    const baseUrl = this.configService.getOrThrow<string>(
      'WEATHER_API_BASE_URL',
    );
    const unitSystem = this.configService.get<string>(
      'WEATHER_API_UNIT_SYSTEM',
      'metric',
    );
    const { latitude, longitude } = await this.getLocationForCountryAndCity({
      country,
      city,
      language,
    });
    const url = `${baseUrl}/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=${unitSystem}&lang=${language}&appid=${apiKey}`;

    return await runHttpRequest<any>(this.httpService.axiosRef, 'get', url);
  }

  async getNews(countryCode: CountryCode) {
    const apiKey = this.configService.getOrThrow<string>('NEWS_API_KEY');
    const baseUrl = this.configService.getOrThrow<string>('NEWS_API_BASE_URL');
    const category = this.configService.get<string>(
      'NEWS_API_CATEGORY',
      'general',
    );
    const url = `${baseUrl}/top-headlines?country=${countryCode}&category=${category}&apiKey=${apiKey}`;
    return await runHttpRequest<TrendingNewsResultDto>(
      this.httpService.axiosRef,
      'get',
      url,
    );
  }

  async getLocationForCoordinates({
    latitude,
    longitude,
  }: CoordinatesLocationDto): Promise<CityLocationDto> {
    const apiKey = this.configService.getOrThrow<string>('WEATHER_API_KEY');
    const baseUrl = this.configService.getOrThrow<string>(
      'WEATHER_API_BASE_URL',
    );
    const url = `${baseUrl}/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
    const [result] = await runHttpRequest<any>(
      this.httpService.axiosRef,
      'get',
      url,
    );
    return result;
  }

  async getLocationForCountryAndCity({
    country,
    city,
  }: WeatherDataDto): Promise<CoordinatesLocationDto> {
    const apiKey = this.configService.getOrThrow<string>('WEATHER_API_KEY');
    const baseUrl = this.configService.getOrThrow<string>(
      'WEATHER_API_BASE_URL',
    );
    const url = `${baseUrl}/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
    const [{ lat: latitude, lon: longitude }] = await runHttpRequest<
      CityLocationDto[]
    >(this.httpService.axiosRef, 'get', url);
    return {
      latitude,
      longitude,
    };
  }
}
