import { useAtom } from "jotai";
import { FlatList, ScrollView } from "react-native";

import { newsAtom } from "@/stores/widgets";
import TopNewsCard from "@/components/news/TopNewsCard";

const NewsSlider = () => {
	const [news] = useAtom(newsAtom);

	return (
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
};

export default NewsSlider;
