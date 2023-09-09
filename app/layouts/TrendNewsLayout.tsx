import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import NewsSlider from "@/components/news/NewsSlider";
import { ActivityIndicator } from "react-native-paper";
import axios from "@/config/axios";
import { TrendingNewsResult } from "@/types/widgets/news";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/cache/accessToken";
import { useTranslation } from "react-i18next";

const TrendNewsTitle = () => {
	const { t } = useTranslation();

	return <Text style={styles.title}>{t("widgets.selector.trendingNews")}</Text>;
};

const TrendNewsLayout = () => {
	const [news, setNews] = useState<TrendingNewsResult | undefined>(undefined);
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				if (!accessToken) return;
				const response = await axios.get<TrendingNewsResult>("/external/news?country=us", {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setNews(response.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return news ? (
		<>
			<TrendNewsTitle />
			<NewsSlider
				articles={news.articles.filter((article) => article.urlToImage !== null && article.author !== null)}
			/>
		</>
	) : (
		<>
			<TrendNewsTitle />
			<Text style={styles.loading}>{t("widgets.news.loading")}</Text>
			<ActivityIndicator size="large" />
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
	loading: {
		textAlign: "center",
		marginVertical: 5,
	},
});

export default TrendNewsLayout;
