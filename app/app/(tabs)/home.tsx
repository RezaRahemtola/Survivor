import { StyleSheet, View } from "react-native";
import React from "react";

import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import mockedWeather from "@/mocks/weather.json";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<CurrentWeatherForecast currentWeather={mockedWeather} />
			<DailyWeatherForecast weather={mockedWeather} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
});
