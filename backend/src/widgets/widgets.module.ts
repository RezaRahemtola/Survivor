import { Module } from '@nestjs/common';
import { WidgetsService } from './widgets.service';
import { WidgetsController } from './widgets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserWidgets from './model/user-widgets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWidgets])],
  controllers: [WidgetsController],
  providers: [WidgetsService],
})
export class WidgetsModule {}
