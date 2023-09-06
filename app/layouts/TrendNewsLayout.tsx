import { StyleSheet } from "react-native";
import axios from "axios";
import { useAtom } from "jotai";
import { Text } from "@/components/Themed";

import { newsAtom } from "@/stores/widgets";
import NewsSlider from "@/components/news/NewsSlider";

const TrendNewsTitle = () => <Text style={styles.title}>Trending News</Text>;

const TrendNewsLayout = () => {
	const [news, setNews] = useAtom(newsAtom);

	const fetchNews = () => {
		axios
			.get("https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=920deb9f754348c0bec4871fef36d971")
			.then((response) => {
				setNews(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (!news) {
		fetchNews();
		return (
			<>
				<TrendNewsTitle />
				<Text>Trend news loading...</Text>
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
