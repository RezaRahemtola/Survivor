import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserSettings, {
  DEFAULT_USER_SETTINGS,
  WorkPresence,
} from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { UserSettingsUpdateDto } from './dto/user-settings-update.dto';
import { ExternalApisService } from '../external-apis/external-apis.service';

export const WORK_PRESENCE_EMOJIS: Record<WorkPresence, string> = {
  office: '🏢',
  remote: '💻',
  vacations: '🌴',
  client: '🤝',
};

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
      const newWorkPresence = newSettings.workPresence;
      await this.externalApisService
        .sendDiscordWebhookEmbed(
          `${email} changed their work presence to ${
            WORK_PRESENCE_EMOJIS[newWorkPresence]
          } ${newWorkPresence.toUpperCase()}`,
          'User work presence changed',
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
