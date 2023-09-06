import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'survivor_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'survivor_app',
      entities: [],
      synchronize: true,
    }),
    GlobalModule,
    AuthModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
