import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    HttpModule.register({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Group-Authorization': '5roNHlfWme2GWpfbKyKeL0_7Ld0u5g7i',
      },
      baseURL: 'https://masurao.fr/api',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
}
