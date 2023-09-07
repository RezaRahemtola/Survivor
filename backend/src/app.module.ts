import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { GlobalModule } from './global.module';
import { ExternalApisModule } from './external-apis/external-apis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WidgetsModule } from './widgets/widgets.module';
import UserWidgets from './widgets/model/user-widgets.entity';

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
        entities: [UserWidgets],
        synchronize: true,
      }),
    }),
    GlobalModule,
    AuthModule,
    EmployeesModule,
    ExternalApisModule,
    WidgetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
