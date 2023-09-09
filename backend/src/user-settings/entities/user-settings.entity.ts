import { Column, Entity, PrimaryColumn } from 'typeorm';

export const WIDGETS = [
  'currentWeather',
  'weatherWeekForecast',
  'trendingNews',
  'icelandCarpooling',
  'nbaGames',
] as const;
export type Widget = (typeof WIDGETS)[number];
export const LANGUAGES = ['fr', 'en', 'es', 'zh', 'gu'] as const;
export type Language = (typeof LANGUAGES)[number];
export const INTERFACE_SCHEMES = ['auto', 'dark', 'light'] as const;
export type InterfaceScheme = (typeof INTERFACE_SCHEMES)[number];
export const DEFAULT_USER_SETTINGS: Omit<UserSettings, 'email'> = {
  widgets: [],
  language: 'en',
  interfaceScheme: 'auto',
};

@Entity()
export default class UserSettings {
  @PrimaryColumn()
  email!: string;

  @Column({ type: 'enum', enum: WIDGETS, array: true, default: [] })
  widgets!: Widget[];

  @Column({ type: 'enum', enum: LANGUAGES, default: 'en' })
  language!: Language;

  @Column({ type: 'enum', enum: INTERFACE_SCHEMES, default: 'auto' })
  interfaceScheme!: InterfaceScheme;
}
