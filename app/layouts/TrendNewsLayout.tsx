import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import NewsSlider from "@/components/news/NewsSlider";
import { ActivityIndicator } from "react-native-paper";
import axios from "@/config/axios";
import { TrendingNewsResult } from "@/types/news";
import { useEffect, useState } from "react";
import { getAccessToken } from "@/cache/accessToken";

const TrendNewsTitle = () => <Text style={styles.title}>Trending News</Text>;

const TrendNewsLayout = () => {
	const [news, setNews] = useState<TrendingNewsResult | undefined>(undefined);

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
				console.log("News error: ", error);
			}
		})();
	}, []);

	return news ? (
		<>
			<TrendNewsTitle />
			<NewsSlider news={news} />
		</>
	) : (
		<>
			<TrendNewsTitle />
			<Text>Trend news loading...</Text>
			<ActivityIndicator size="large" />
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
});

export default TrendNewsLayout;
