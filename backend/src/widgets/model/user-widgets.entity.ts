import { Column, Entity, PrimaryColumn } from 'typeorm';

export const widgetNames = [
  'currentWeather',
  'weatherWeekForecast',
  'trendingNews',
] as const;
export type WidgetName = (typeof widgetNames)[number];

@Entity()
export default class UserWidgets {
  @PrimaryColumn()
  userEmail: string;

  @Column({ type: 'text', array: true })
  widgets: WidgetName[];
}
