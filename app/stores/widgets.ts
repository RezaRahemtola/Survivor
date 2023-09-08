import { atom } from "jotai";
import { WidgetType } from "@/types/widgets";

export const locationErrorAtom = atom<string | undefined>(undefined);

export const weatherAtom = atom<any>(undefined);

export const widgetsAtom = atom<WidgetType[]>([]);
