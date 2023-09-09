export type TrendingNewsArticle = {
	source: {
		id: string;
		name: string;
	};
	author: string | null;
	title: string;
	description: string;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string;
};

export type TrendingNewsResult = {
	status: "ok" | "error";
	totalResults: number;
	articles: TrendingNewsArticle[];
};
