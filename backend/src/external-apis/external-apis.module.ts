import { Module } from '@nestjs/common';
import { ExternalApisService } from './external-apis.service';
import { ExternalApisController } from './external-apis.controller';

@Module({
  controllers: [ExternalApisController],
  providers: [ExternalApisService],
  exports: [ExternalApisService],
})
export class ExternalApisModule {}
