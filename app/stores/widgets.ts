import { atom } from "jotai";
import { UserSettings, WidgetType } from "@/types/settings";

export const locationErrorAtom = atom<string | undefined>(undefined);

export const weatherAtom = atom<any>(undefined);

export const userSettingsAtom = atom<UserSettings | undefined>(undefined);
export const widgetsAtom = atom<WidgetType[]>([]);
