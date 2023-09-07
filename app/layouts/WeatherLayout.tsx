import { locationAtom, locationErrorAtom, weatherAtom } from "@/stores/widgets";
import { useAtom } from "jotai";
import * as Location from "expo-location";
import { ReactNode } from "react";
import axios from "axios";

import { Text } from "@/components/Themed";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

type WeatherLayoutProps = {
	children: ReactNode;
};
const WeatherLayout = ({ children }: WeatherLayoutProps) => {
	const [weather, setWeather] = useAtom(weatherAtom);
	const [location, setLocation] = useAtom(locationAtom);
	const [locationError, setLocationError] = useAtom(locationErrorAtom);

	const fetchLocation = async () => {
		const { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setLocationError("Permission to access location was denied");
			return;
		}
		const position = await Location.getCurrentPositionAsync();
		setLocation(position);
	};

	const fetchWeather = () => {
		if (!location) return;
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coords.latitude}&lon=${location.coords.longitude}&exclude=hourly,minutely&units=metric&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`,
			)
			.then((response) => {
				setWeather(response.data);
			});
	};

	if (!location && !locationError) {
		fetchLocation();
		return (
			<>
				<Text style={styles.text}>Waiting for location data..</Text>
				<ActivityIndicator size="large" />
			</>
		);
	} else if (!weather && !locationError) {
		fetchWeather();
		return (
			<>
				<Text style={styles.text}>Weather data loading...</Text>
				<ActivityIndicator size="large" />
			</>
		);
	} else if (locationError) {
		return <Text>{locationError}</Text>;
	}

	return <>{children}</>;
};

const styles = StyleSheet.create({
	text: {
		textAlign: "center",
		marginVertical: 5,
	},
});

export default WeatherLayout;
