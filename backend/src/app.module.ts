import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'

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
    CacheModule.register(),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
