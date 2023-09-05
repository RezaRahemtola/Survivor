import { Platform, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Device from "expo-device";
import * as Location from "expo-location";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";

export default function HomeScreen() {
	const [weather, setWeather] = useState<any | undefined>(undefined);

	useEffect(() => {
		(async () => {
			if (Platform.OS === "android" && !Device.isDevice) {
				return;
			}
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.error("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});

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
			{weather ? (
				<>
					<CurrentWeatherForecast currentWeather={weather} />
					<DailyWeatherForecast weather={weather} />
				</>
			) : (
				<></>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
});
