import { atom } from "jotai";
import { MessageReceiveData } from "@/types/chat";

export const MessageReceiveAtom = atom<MessageReceiveData[]>([]);
