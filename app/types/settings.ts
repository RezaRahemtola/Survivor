export type WidgetType = "currentWeather" | "weatherWeekForecast" | "trendingNews";

export type LanguageType = "fr" | "en";

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
};
