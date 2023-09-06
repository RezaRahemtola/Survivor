import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';

@Global()
@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Group-Authorization': '5roNHlfWme2GWpfbKyKeL0_7Ld0u5g7i',
      },
      baseURL: 'https://masurao.fr/api',
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 60, // CACHING GOEESSS BRRRRRRRRRRRRRRRRRRR
    }),
  ],
  exports: [HttpModule, CacheModule],
})
export class GlobalModule {}
