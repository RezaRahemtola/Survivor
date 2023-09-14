import { Module } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UserSettingsController } from './user-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserSettings from './entities/user-settings.entity';
import { ExternalApisModule } from '../external-apis/external-apis.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSettings]), ExternalApisModule],
  controllers: [UserSettingsController],
  providers: [UserSettingsService],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
