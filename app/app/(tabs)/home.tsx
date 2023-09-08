import { ScrollView, StyleSheet } from "react-native";
import { useEffect } from "react";

import TrendNewsLayout from "@/layouts/TrendNewsLayout";
import WeatherLayout from "@/layouts/WeatherLayout";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";
import { WidgetType } from "@/types/widgets";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { Text } from "@/components/Themed";
import { useAtom } from "jotai/index";
import { widgetsAtom } from "@/stores/widgets";

const WidgetComponent = ({ name }: { name: WidgetType }) => {
	if (name === "trendingNews") {
		return <TrendNewsLayout />;
	} else if (name === "currentWeather") {
		return (
			<WeatherLayout>
				<CurrentWeatherForecast />
			</WeatherLayout>
		);
	} else if (name === "weatherWeekForecast") {
		return (
			<WeatherLayout>
				<DailyWeatherForecast />
			</WeatherLayout>
		);
	}
	return <></>;
};

export default function HomeScreen() {
	const [widgets, setWidgets] = useAtom(widgetsAtom);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<WidgetType[]>(`/widgets`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setWidgets(response.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<ScrollView style={styles.container}>
			{widgets.map((widget, index) => (
				<WidgetComponent name={widget} key={index} />
			))}
			{widgets.length === 0 ? (
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Text style={styles.noWidget}>No widgets yet</Text>
				</ScrollView>
			) : (
				<></>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	noWidget: {
		fontSize: 25,
	},
});
