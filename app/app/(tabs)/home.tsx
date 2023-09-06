import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";
import TrendNews from "@/layouts/TrendNews";
import WeatherLayout from "@/layouts/WeatherLayout";

export default function HomeScreen() {
	return (
		<ScrollView style={styles.container}>
			<WeatherLayout>
				<CurrentWeatherForecast />
				<DailyWeatherForecast />
			</WeatherLayout>
			<TrendNews />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
