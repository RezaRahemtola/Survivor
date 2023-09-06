import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";
import TrendNews from "@/layouts/TrendNews";

export default function HomeScreen() {
	const [weather, setWeather] = useState<any>(undefined);
	const [errorMsg, setErrorMsg] = useState<string>("");

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});

			fetch(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,minutely&units=metric&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`,
			).then(async (response) => {
				const data = await response.json();
				setWeather(data);
			});
		})();
	}, []);

	return (
		<View style={styles.container}>
			<CurrentWeatherForecast weather={weather} errorMsg={errorMsg} />
			<DailyWeatherForecast weather={weather} errorMsg={errorMsg} />
			<TrendNews />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
