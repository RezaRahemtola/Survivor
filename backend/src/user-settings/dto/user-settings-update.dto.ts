import { IsArray, IsEnum, IsOptional } from 'class-validator';
import {
  INTERFACE_SCHEMES,
  InterfaceScheme,
  Language,
  LANGUAGES,
  Widget,
  WIDGETS,
} from '../entities/user-settings.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserSettingsUpdateDto {
  @ApiPropertyOptional({
    description: 'Widgets to be displayed on the dashboard',
    enum: WIDGETS,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(WIDGETS, { each: true })
  widgets?: Widget[];

  @ApiPropertyOptional({
    description: 'Language of the interface',
    enum: LANGUAGES,
  })
  @IsOptional()
  @IsEnum(LANGUAGES)
  language?: Language;

  @ApiPropertyOptional({
    description: 'Interface scheme',
    enum: INTERFACE_SCHEMES,
  })
  @IsOptional()
  @IsEnum(INTERFACE_SCHEMES)
  interfaceScheme?: InterfaceScheme;
}
