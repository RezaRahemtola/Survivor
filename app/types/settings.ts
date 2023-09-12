import { WidgetType } from "@/types/widgets";

export type LanguageType = "fr" | "en" | "es" | "zh" | "hi" | "pt" | "ja" | "de";

export const interfaceThemes = ["auto", "dark", "light"] as const;
export type ThemeType = (typeof interfaceThemes)[number];

export const workPresences = ["office", "remote", "vacations", "client"] as const;
export type WorkPresence = (typeof workPresences)[number];
export const workPresenceIcons: Record<WorkPresence, string> = {
	office: "🏢",
	remote: "💻",
	vacations: "🌴",
	client: "🤝",
};

export type UserSettings = {
	widgets: WidgetType[];
	language: LanguageType;
	interfaceTheme: ThemeType;
	workPresence: WorkPresence;
};
