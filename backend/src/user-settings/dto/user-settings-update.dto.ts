import { IsArray, IsEnum, IsOptional } from 'class-validator';
import {
  INTERFACE_SCHEMES,
  InterfaceScheme,
  Language,
  LANGUAGES,
  Widget,
  WIDGETS,
} from '../entities/user-settings.entity';

export class UserSettingsUpdateDto {
  @IsOptional()
  @IsArray()
  @IsEnum(WIDGETS, { each: true })
  widgets?: Widget[];

  @IsOptional()
  @IsEnum(LANGUAGES)
  language?: Language;

  @IsOptional()
  @IsEnum(INTERFACE_SCHEMES)
  interfaceScheme?: InterfaceScheme;
}
