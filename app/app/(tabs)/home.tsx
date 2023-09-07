import { ScrollView, StyleSheet } from "react-native";
import TrendNewsLayout from "@/layouts/TrendNewsLayout";
import WeatherLayout from "@/layouts/WeatherLayout";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";

export default function HomeScreen() {
	return (
		<ScrollView style={styles.container}>
			<TrendNewsLayout />
			<WeatherLayout>
				<CurrentWeatherForecast />
				<DailyWeatherForecast />
			</WeatherLayout>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
