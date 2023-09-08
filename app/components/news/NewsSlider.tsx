import { FlatList, ScrollView } from "react-native";
import TopNewsCard from "@/components/news/TopNewsCard";
import { TrendingNewsArticle } from "@/types/news";

const NewsSlider = ({ articles }: { articles: TrendingNewsArticle }) => (
	<ScrollView>
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={articles}
			keyExtractor={(_, index) => "key" + index}
			renderItem={({ item }) => <TopNewsCard item={item} />}
		/>
	</ScrollView>
);

export default NewsSlider;
