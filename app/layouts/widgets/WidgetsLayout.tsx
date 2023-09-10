import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { RenderItemParams } from "react-native-draggable-flatlist/src/types";

import TrendNewsLayout from "@/layouts/TrendNewsLayout";
import WeatherLayout from "@/layouts/WeatherLayout";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";
import IcelandCarpoolingLayout from "@/layouts/IcelandCarpoolingLayout";
import NBARandomGamesLayout from "@/layouts/NBARandomGamesLayout";
import { WidgetType } from "@/types/widgets";
import { Button } from "react-native-paper";
import { useAtom } from "jotai";
import { editionWidgetsAtom, isWidgetsEditionModeAtom } from "@/stores/widgets";

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

type WidgetsLayoutProps = {
	widgets: WidgetType[];
	onSave: (newWidgets: WidgetType[]) => void;
};
const WidgetsLayout = ({ widgets, onSave }: WidgetsLayoutProps) => {
	const [editionWidgets, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const [isEditionMode, setIsEditionMode] = useAtom(isWidgetsEditionModeAtom);

	useEffect(() => {
		setEditionWidgets(widgets);
	}, []);
	const renderDraggableItem = ({ item, drag }: RenderItemParams<WidgetType>) => {
		return (
			<TouchableOpacity
				onLongPress={() => {
					if (isEditionMode) {
						drag();
					}
				}}
			>
				<WidgetComponent name={item} />
			</TouchableOpacity>
		);
	};

	return (
		<>
			<DraggableFlatList
				data={editionWidgets}
				onDragEnd={({ data }) => setEditionWidgets(data)}
				keyExtractor={(item) => item}
				renderItem={renderDraggableItem}
			/>
			<Button disabled={isEditionMode} icon="pencil" mode="contained-tonal" onPress={() => setIsEditionMode(true)}>
				Edit
			</Button>
		</>
	);
};

export default WidgetsLayout;
