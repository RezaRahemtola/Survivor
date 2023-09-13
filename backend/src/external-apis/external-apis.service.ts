import { Injectable } from '@nestjs/common';
import { runHttpRequest, runHttpRequestWithData } from '../http';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import TrendingNewsResultDto from './dto/trending-news-result.dto';
import {
  CityLocationDto,
  CoordinatesLocationDto,
  CountryCode,
  WeatherDataDto,
} from './dto/location.dto';

export const DISCORD_WEBHOOK_EMBED_TYPES = {
  info: {
    color: 0x0000ff,
    authorName: '❕ Information',
  },
  success: {
    color: 0x00ff00,
    authorName: '✅ Success',
  },
  warn: {
    color: 0xffff00,
    authorName: '⚠️ Warning',
  },
  error: {
    color: 0xff0000,
    authorName: '❌ Error',
  },
} as const;
export type DiscordWebhookEmbedStatus =
  keyof typeof DISCORD_WEBHOOK_EMBED_TYPES;

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

  async sendDiscordWebhookMessage(message: string) {
    const webhookUrl = this.configService.getOrThrow<string>(
      'DISCORD_WEBHOOK_URL',
    );
    const username = this.configService.get<string>(
      'DISCORD_WEBHOOK_USERNAME',
      'TrombiDay',
    );
    const avatar_url = this.configService.get<string>(
      'DISCORD_WEBHOOK_AVATAR_URL',
    );
    await runHttpRequestWithData<never>(
      this.httpService.axiosRef,
      'post',
      webhookUrl,
      {
        content: message,
        username,
        avatar_url,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  async sendDiscordWebhookEmbed(
    message: string,
    title?: string,
    status: DiscordWebhookEmbedStatus = 'info',
  ) {
    const webhookUrl = this.configService.getOrThrow<string>(
      'DISCORD_WEBHOOK_URL',
    );
    const username = this.configService.get<string>(
      'DISCORD_WEBHOOK_USERNAME',
      'TrombiDay',
    );
    const avatar_url = this.configService.get<string>(
      'DISCORD_WEBHOOK_AVATAR_URL',
    );
    const embedType = DISCORD_WEBHOOK_EMBED_TYPES[status];
    await runHttpRequestWithData<never>(
      this.httpService.axiosRef,
      'post',
      webhookUrl,
      {
        embeds: [
          {
            title,
            description: message,
            author: {
              name: embedType.authorName,
            },
            color: embedType.color,
          },
        ],
        username,
        avatar_url,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
