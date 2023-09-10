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
import { useAtom } from "jotai";
import { editionWidgetsAtom, isWidgetsEditionModeAtom } from "@/stores/widgets";
import { Button } from "react-native-paper";

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
	const renderDraggableItem = ({ item, drag }: RenderItemParams<WidgetType | "editButton">) => {
		return (
			<>
				{item !== "editButton" ? (
					<TouchableOpacity
						onLongPress={() => {
							if (isEditionMode) {
								drag();
							}
						}}
					>
						<WidgetComponent name={item} />
					</TouchableOpacity>
				) : (
					<Button disabled={isEditionMode} icon="pencil" mode="contained-tonal" onPress={() => setIsEditionMode(true)}>
						Edit
					</Button>
				)}
			</>
		);
	};

	return (
		<>
			<DraggableFlatList
				data={[...editionWidgets, "editButton"]}
				onDragEnd={({ data }: { data: (WidgetType | "editButton")[] }) =>
					setEditionWidgets(data.filter((item) => item !== "editButton") as WidgetType[])
				}
				keyExtractor={(item) => item}
				renderItem={renderDraggableItem}
				showsVerticalScrollIndicator={false}
			/>
		</>
	);
};

export default WidgetsLayout;
