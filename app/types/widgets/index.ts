export const widgetTypes = [
	"currentWeather",
	"weatherWeekForecast",
	"trendingNews",
	"icelandCarpooling",
	"nbaGames",
] as const;
export type WidgetType = (typeof widgetTypes)[number];
