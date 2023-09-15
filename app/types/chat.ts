export type MessageReceiveData = {
	message: string;
	email: string;
};

export type Message = {
	id: number;
	sender: string;
	receiver?: string;
	content: string;
	pictures: string[];
	createdAt: Date;
};
