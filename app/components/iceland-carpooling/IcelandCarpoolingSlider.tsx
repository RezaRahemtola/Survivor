import { FlatList, ScrollView } from "react-native";
import { IcelandCarpoolingData } from "@/types/widgets/iceland-carpooling";
import IcelandCarpoolingCard from "@/components/iceland-carpooling/IcelandCarpoolingCard";

const IcelandCarpoolingSlider = ({ rides }: { rides: IcelandCarpoolingData[] }) => (
	<ScrollView>
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			data={rides}
			keyExtractor={(_, index) => "key" + index}
			renderItem={({ item }) => <IcelandCarpoolingCard item={item} />}
		/>
	</ScrollView>
);

export default IcelandCarpoolingSlider;
