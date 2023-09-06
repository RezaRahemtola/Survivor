import { atom } from "jotai";
import { LocationObject } from "expo-location";

export const locationAtom = atom<LocationObject | undefined>(undefined);
export const locationErrorAtom = atom<string | undefined>(undefined);

export const weatherAtom = atom<any>(undefined);
