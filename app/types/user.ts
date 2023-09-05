export type BaseUser = {
	id: number;
	email: string;
	name: string;
	surname: string;
};

export type User = BaseUser & {
	birth_date: string;
	gender: string;
	work: string;
	subordinates: number[];
};

export type AuthUser = User & {
	access_token: string;
};
