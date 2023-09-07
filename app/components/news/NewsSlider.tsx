import { FlatList, ScrollView } from "react-native";
import TopNewsCard from "@/components/news/TopNewsCard";
import { TrendingNewsResult } from "@/types/news";

const NewsSlider = ({ news }: { news: TrendingNewsResult }) => (
	<ScrollView>
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={news.articles}
			keyExtractor={(_, index) => "key" + index}
			renderItem={({ item }) => <TopNewsCard item={item} />}
		/>
	</ScrollView>
);

export default NewsSlider;
