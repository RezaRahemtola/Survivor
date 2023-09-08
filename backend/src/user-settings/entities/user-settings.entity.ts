import { Column, Entity, PrimaryColumn } from 'typeorm';

export const widgets = [
  'currentWeather',
  'weatherWeekForecast',
  'trendingNews',
] as const;
export type Widget = (typeof widgets)[number];
export const languages = ['fr-fr', 'en-us', 'en-gb'] as const;
export type Language = (typeof languages)[number];
export const interfaceSchemes = ['auto', 'dark', 'light'] as const;
export type InterfaceScheme = (typeof interfaceSchemes)[number];
export const defaultUserSettings: Omit<UserSettings, 'email'> = {
  widgets: [],
  language: 'en-us',
  interfaceScheme: 'auto',
};

@Entity()
export default class UserSettings {
  @PrimaryColumn()
  email!: string;

  @Column({ type: 'enum', enum: widgets, array: true, default: [] })
  widgets!: Widget[];

  @Column({ type: 'enum', enum: languages, default: 'en-us' })
  language!: Language;

  @Column({ type: 'enum', enum: interfaceSchemes, default: 'auto' })
  interfaceScheme!: InterfaceScheme;
}
