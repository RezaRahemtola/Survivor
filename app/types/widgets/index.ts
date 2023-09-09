export const widgetTypes = ["currentWeather", "weatherWeekForecast", "trendingNews", "icelandCarpooling"] as const;
export type WidgetType = (typeof widgetTypes)[number];
