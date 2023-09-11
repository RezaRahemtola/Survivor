import { WidgetType } from "@/types/widgets";

export type LanguageType = "fr" | "en" | "es";

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
};

export type ResetSettingsResponse = {
	email: string;
	widgets: WidgetType[];
	language: LanguageType;
	InterfaceScheme: string;
};
