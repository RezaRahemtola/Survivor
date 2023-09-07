import { StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { Text } from "@/components/Themed";

import { newsAtom } from "@/stores/widgets";
import NewsSlider from "@/components/news/NewsSlider";
import { ActivityIndicator } from "react-native-paper";
import axios from "@/config/axios";
import { TrendingNewsResult } from "@/types/news";
import { useEffect } from "react";

const TrendNewsTitle = () => <Text style={styles.title}>Trending News</Text>;

const TrendNewsLayout = () => {
	const [news, setNews] = useAtom(newsAtom);

	useEffect(() => {
		(async () => {
			if (!news) {
				const response = await axios.get<TrendingNewsResult>("/external/news?country=us");
				setNews(response.data);
			}
		})();
	}, []);

	if (!news) {
		return (
			<>
				<TrendNewsTitle />
				<Text>Trend news loading...</Text>
				<ActivityIndicator size="large" />
			</>
		);
	}

	return (
		<>
			<TrendNewsTitle />
			<NewsSlider />
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
