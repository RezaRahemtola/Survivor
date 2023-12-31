import { WorkPresence } from "@/types/settings";

export type BaseUser = {
	id: number;
	email: string;
	name: string;
	surname: string;
	workPresence: WorkPresence;
};

type UserPicture = {
	picture: string;
};

type FullUserData = {
	birth_date: string;
	gender: string;
	work: string;
	subordinates: number[];
};

export type BaseUserWithPicture = BaseUser & Partial<UserPicture>;

export type User = BaseUserWithPicture & Partial<FullUserData>;
export type FullUser = BaseUserWithPicture & FullUserData;
export type ModalUser = Omit<FullUser, "id" | "subordinates">;

export const isFullUser = (user: User | FullUser): user is User => {
	return (user as User).work !== undefined;
};
