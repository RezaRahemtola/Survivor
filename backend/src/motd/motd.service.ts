import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MotdService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheService: Cache) {}

  async getMotd(): Promise<string> {
    const motd = await this.cacheService.get<string>('motd');

    if (!motd) {
      throw new NotFoundException('No message of the day found');
    }

    return motd;
  }

  async updateMotd(motd: string): Promise<string> {
    await this.cacheService.set('motd', motd, 1000 * 60 * 60 * 24); // 1 day
    return motd;
  }
}
