import { useAtom } from "jotai";
import * as Location from "expo-location";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { locationErrorAtom, weatherAtom } from "@/stores/widgets";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { PlaceResponse } from "@/types/weather";

type WeatherLayoutProps = {
	children: ReactNode;
};
const WeatherLayout = ({ children }: WeatherLayoutProps) => {
	const [weather, setWeather] = useAtom(weatherAtom);
	const [locationError, setLocationError] = useAtom(locationErrorAtom);
	const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);

	useEffect(() => {
		(async () => {
			let position = undefined;

			if (!location) {
				const { status } = await Location.requestForegroundPermissionsAsync();
				if (status !== "granted") {
					setLocationError("Permission to access location was denied");
					return;
				}
				position = await Location.getCurrentPositionAsync();
				setLocation(position);
			}

			try {
				const accessToken = await getAccessToken();

				const place = await axios.post<PlaceResponse>(
					"/external/location",
					{
						latitude: location?.coords.latitude ?? position?.coords.latitude,
						longitude: location?.coords.longitude ?? position?.coords.longitude,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${accessToken}`,
						},
					},
				);

				const weather = await axios.post(
					"/external/weather",
					{ city: place.data.name, country: place.data.country.toLowerCase() },
					{ headers: { Authorization: `Bearer ${accessToken}` } },
				);

				setWeather(weather.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	if (!location && !locationError) {
		return (
			<>
				<Text style={styles.text}>Waiting for location data..</Text>
				<ActivityIndicator size="large" />
			</>
		);
	} else if (!weather && !locationError) {
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
