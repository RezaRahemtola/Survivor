export const widgetTypes = ["currentWeather", "weatherWeekForecast", "trendingNews"] as const;
export type WidgetType = (typeof widgetTypes)[number];

export type LanguageType = "fr" | "en" | "es";

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
};
