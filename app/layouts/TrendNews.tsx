import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import axios from "axios";

import TopNewsCard from "@/components/TopNewsCard";
import { Text } from "@/components/Themed";

const TrendNews = () => {
	const [isLoading, setLoading] = useState(true);
	const [news, setNews] = useState<any>([]);

	useEffect(() => {
		getNewsFromAPI();
	}, []);

	const getNewsFromAPI = () => {
		axios
			.get("https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=920deb9f754348c0bec4871fef36d971")
			.then((response) => {
				setNews(response.data);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (!news) {
		return null;
	}

	return (
		<>
			<Text style={styles.title}>Trending News</Text>
			<ScrollView>
				{isLoading ? (
					<Text>Trend news loading...</Text>
				) : (
					<FlatList
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						data={news.articles}
						keyExtractor={(_, index) => "key" + index}
						renderItem={({ item }) => <TopNewsCard item={item} />}
					/>
				)}
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
});

export default TrendNews;
