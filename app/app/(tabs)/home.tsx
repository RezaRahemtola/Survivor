import { ScrollView, StyleSheet } from "react-native";
import TrendNewsLayout from "@/layouts/TrendNewsLayout";

export default function HomeScreen() {
	return (
		<ScrollView style={styles.container}>
			<TrendNewsLayout />
			{/*<WeatherLayout>*/}
			{/*	<CurrentWeatherForecast />*/}
			{/*	<DailyWeatherForecast />*/}
			{/*</WeatherLayout>*/}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
