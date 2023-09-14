import { Module } from '@nestjs/common';
import { MotdService } from './motd.service';
import { MotdController } from './motd.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MotdController],
  providers: [MotdService],
})
export class MotdModule {}
