export const widgetTypes = [
	"currentWeather",
	"weatherWeekForecast",
	"trendingNews",
	"icelandCarpooling",
	"nbaGames",
] as const;
export const widgetIcons: Record<WidgetType, string> = {
	currentWeather: "🌥️",
	weatherWeekForecast: "🌧️",
	trendingNews: "🗞️",
	icelandCarpooling: "🚗",
	nbaGames: "🏀",
};

export type WidgetType = (typeof widgetTypes)[number];
