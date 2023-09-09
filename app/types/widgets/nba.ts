export type NBATeam = {
	id: number;
	abbreviation: string;
	city: string;
	conference: string;
	division: string;
	full_name: string;
	name: string;
};

export type NBAGameResponse = {
	id: number;
	date: string;
	home_team: NBATeam;
	home_team_score: number;
	period: number;
	postseason: boolean;
	season: number;
	status: string;
	time: string;
	visitor_team: NBATeam;
	visitor_team_score: number;
};
