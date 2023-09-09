import { FlatList, ListRenderItem, ScrollView } from "react-native";

type SliderProps<T> = {
	items: T[];
	keyExtractor: (item: T, index: number) => string;
	renderItem: ListRenderItem<T>;
};
const Slider = <T,>({ items, keyExtractor, renderItem }: SliderProps<T>) => (
	<ScrollView>
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={items}
			keyExtractor={keyExtractor}
			renderItem={renderItem}
		/>
	</ScrollView>
);

export default Slider;
