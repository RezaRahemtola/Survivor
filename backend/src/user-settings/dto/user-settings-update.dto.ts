import { IsArray, IsEnum, IsOptional } from 'class-validator';
import {
  InterfaceScheme,
  interfaceSchemes,
  Language,
  languages,
  Widget,
  widgets,
} from '../entities/user-settings.entity';

export class UserSettingsUpdateDto {
  @IsOptional()
  @IsArray()
  @IsEnum(widgets, { each: true })
  widgets?: Widget[];

  @IsOptional()
  @IsEnum(languages)
  language?: Language;

  @IsOptional()
  @IsEnum(interfaceSchemes)
  interfaceScheme?: InterfaceScheme;
}
