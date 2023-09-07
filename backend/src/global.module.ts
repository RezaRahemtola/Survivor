import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Group-Authorization': config.getOrThrow<string>('MASURAO_API_KEY'),
        },
        baseURL: config.get<string>(
          'MASURAO_API_BASE_URL',
          'https://masurao.fr/api',
        ),
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        isGlobal: true,
        ttl: config.get<number>('CACHING_GLOBAL_TTL', 1000 * 60 * 60), // CACHING GOEESSS BRRRRRRRRRRRRRRRRRRR
      }),
    }),
  ],
  exports: [HttpModule, CacheModule],
})
export class GlobalModule {}
