import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { GlobalModule } from './global.module';
import { ExternalApisModule } from './external-apis/external-apis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ChatModule } from './chat/chat.module';
import { MotdModule } from './motd/motd.module';
import UserSettings from './user-settings/entities/user-settings.entity';
import ChatMessage from './chat/entities/chat-message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('POSTGRES_HOST'),
        port: config.getOrThrow<number>('POSTGRES_PORT'),
        username: config.getOrThrow<string>('POSTGRES_USERNAME'),
        password: config.getOrThrow<string>('POSTGRES_PASSWORD'),
        database: config.getOrThrow<string>('POSTGRES_DATABASE'),
        entities: [UserSettings, ChatMessage],
        synchronize: true,
      }),
    }),
    GlobalModule,
    AuthModule,
    EmployeesModule,
    ExternalApisModule,
    UserSettingsModule,
    ChatModule,
    MotdModule,
  ],
  controllers: [],
})
export class AppModule {}
