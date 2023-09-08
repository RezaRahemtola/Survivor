import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserSettings, {
  DEFAULT_USER_SETTINGS,
} from './entities/user-settings.entity';
import { Repository } from 'typeorm';
import { UserSettingsUpdateDto } from './dto/user-settings-update.dto';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private readonly userSettingsRepository: Repository<UserSettings>,
  ) {}

  async getSelfUserSettings(email: string): Promise<UserSettings> {
    return this.userSettingsRepository
      .findOneOrFail({ where: { email } })
      .catch(() => this.userSettingsRepository.save({ email }));
  }

  async updateSelfUserSettings(
    email: string,
    newSettings: UserSettingsUpdateDto,
  ): Promise<UserSettings> {
    return this.userSettingsRepository.save({ email, ...newSettings });
  }

  async resetUserSettings(email: string) {
    return this.userSettingsRepository.save({
      email,
      ...DEFAULT_USER_SETTINGS,
    });
  }
}
