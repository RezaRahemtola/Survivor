import { atom } from "jotai";
import { WidgetType } from "@/types/widgets";
import { UserSettings } from "@/types/settings";
import { WeatherData } from "@/types/widgets/weather";
import { LeaderUser } from "@/types/user";

export const locationErrorAtom = atom<string | undefined>(undefined);

export const weatherAtom = atom<WeatherData | undefined>(undefined);

export const userSettingsAtom = atom<UserSettings | undefined>(undefined);
export const editionWidgetsAtom = atom<WidgetType[]>([]);
export const isWidgetsEditionModeAtom = atom<boolean>(false);

export const leadersAtom = atom<LeaderUser[]>([]);
