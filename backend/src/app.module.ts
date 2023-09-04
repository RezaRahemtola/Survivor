import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'app',
      entities: [],
      synchronize: true,
    }),
    CacheModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
