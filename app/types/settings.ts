import { WidgetType } from "@/types/widgets";

export type LanguageType = "fr" | "en" | "es";

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
};
