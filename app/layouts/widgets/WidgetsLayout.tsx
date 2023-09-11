import { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { RenderItemParams } from "react-native-draggable-flatlist/src/types";
import { useAtom } from "jotai";
import { IconButton } from "react-native-paper";

import TrendNewsLayout from "@/layouts/widgets/news/TrendNewsLayout";
import WeatherLayout from "@/layouts/widgets/weather/WeatherLayout";
import CurrentWeatherForecast from "@/components/widgets/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/widgets/weather/DailyWeatherForecast";
import IcelandCarpoolingLayout from "@/layouts/widgets/iceland-carpooling/IcelandCarpoolingLayout";
import NBARandomGamesLayout from "@/layouts/widgets/nba/NBARandomGamesLayout";
import { WidgetType } from "@/types/widgets";
import { editionWidgetsAtom, isWidgetsEditionModeAtom } from "@/stores/widgets";
import { WidgetEditionEditButton } from "@/components/widgets/WidgetEditionButtons";

const WidgetComponent = ({ name }: { name: WidgetType }) => {
	switch (name) {
		case "trendingNews":
			return <TrendNewsLayout />;
		case "currentWeather":
			return (
				<WeatherLayout>
					<CurrentWeatherForecast />
				</WeatherLayout>
			);
		case "weatherWeekForecast":
			return (
				<WeatherLayout>
					<DailyWeatherForecast />
				</WeatherLayout>
			);
		case "icelandCarpooling":
			return <IcelandCarpoolingLayout />;
		case "nbaGames":
			return <NBARandomGamesLayout />;
	}
};

const WidgetWrapper = ({
	name,
	isEditionMode,
	drag,
}: {
	name: WidgetType;
	isEditionMode: boolean;
	drag?: () => void;
}) => {
	const [, setEditionWidgets] = useAtom(editionWidgetsAtom);
	return (
		<View>
			{isEditionMode ? (
				<IconButton
					style={styles.deleteIcon}
					icon="minus-thick"
					iconColor="red"
					onPress={() => setEditionWidgets((prev) => prev.filter((widget) => widget !== name))}
				/>
			) : (
				<></>
			)}
			<TouchableOpacity
				disabled={!isEditionMode}
				onLongPress={() => {
					if (isEditionMode && drag) {
						drag();
					}
				}}
			>
				<WidgetComponent name={name} />
			</TouchableOpacity>
		</View>
	);
};

type WidgetsLayoutProps = {
	widgets: WidgetType[];
};
const WidgetsLayout = ({ widgets }: WidgetsLayoutProps) => {
	const [editionWidgets, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const [isEditionMode] = useAtom(isWidgetsEditionModeAtom);

	useEffect(() => {
		setEditionWidgets(widgets);
	}, []);
	const renderDraggableItem = ({ item, drag }: RenderItemParams<WidgetType>) => (
		<WidgetWrapper name={item} isEditionMode={isEditionMode} drag={drag} />
	);

	return (
		<>
			{isEditionMode ? (
				<DraggableFlatList
					data={editionWidgets}
					onDragEnd={({ data }: { data: WidgetType[] }) => setEditionWidgets(data)}
					keyExtractor={(item) => item}
					renderItem={renderDraggableItem}
					showsVerticalScrollIndicator
				/>
			) : (
				<FlatList
					data={[...editionWidgets, "editButton"]}
					keyExtractor={(item) => item}
					renderItem={({ item }: { item: WidgetType | "editButton" }) => (
						<>
							{item !== "editButton" ? (
								<WidgetWrapper name={item} isEditionMode={isEditionMode} />
							) : (
								<WidgetEditionEditButton />
							)}
						</>
					)}
				/>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	deleteIcon: {
		top: 0,
		left: -10,
	},
});
export default WidgetsLayout;
