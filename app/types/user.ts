export type BaseUser = {
	id: number;
	email: string;
	name: string;
	surname: string;
};

type UserPicture = {
	picture: string;
};

export type BaseUserWithPicture = BaseUser & UserPicture;

export type User = BaseUser &
	UserPicture & {
		birth_date: string;
		gender: string;
		work: string;
		subordinates: number[];
	};

export type AuthUser = User & {
	access_token: string;
};
