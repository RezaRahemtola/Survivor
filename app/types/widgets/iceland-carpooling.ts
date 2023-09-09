export type IcelandCarpoolingData = {
	link: string;
	from: string;
	to: string;
	date: string;
	time: string;
};

export type IcelandCarpoolingResponse = {
	results: IcelandCarpoolingData[];
};
