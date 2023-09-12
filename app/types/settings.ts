import { WidgetType } from "@/types/widgets";

export type LanguageType = "fr" | "en" | "es" | "zh" | "hi" | "pt" | "ja";

export const interfaceThemes = ["auto", "dark", "light"] as const;
export type ThemeType = (typeof interfaceThemes)[number];

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
	interfaceTheme: ThemeType;
};
