import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserSettings, {
  DEFAULT_USER_SETTINGS,
} from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { UserSettingsUpdateDto } from './dto/user-settings-update.dto';
import { ExternalApisService } from '../external-apis/external-apis.service';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
    private readonly externalApisService: ExternalApisService,
  ) {}

  async getUserSettings(email: string): Promise<UserSettings> {
    return this.userSettingsRepository
      .findOneOrFail({ where: { email } })
      .catch(() => this.userSettingsRepository.save({ email }));
  }

  async updateUserSettings(
    email: string,
    newSettings: UserSettingsUpdateDto,
  ): Promise<UserSettings> {
    if (newSettings.workPresence) {
      await this.externalApisService
        .sendDiscordWebhookMessage(
          `User identified as ${email} changed their work presence to ${newSettings.workPresence.toUpperCase()}`,
        )
        .catch(console.error);
    }
    return this.userSettingsRepository.save({ email, ...newSettings });
  }

  async resetUserSettings(email: string) {
    return this.userSettingsRepository.save({
      email,
      ...DEFAULT_USER_SETTINGS,
    });
  }
}
