export type WidgetType = "currentWeather" | "weatherWeekForecast" | "trendingNews";

export type LanguageType = "fr" | "en" | "es";

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
};
