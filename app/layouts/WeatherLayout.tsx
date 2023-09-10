import { useAtom } from "jotai";
import * as Location from "expo-location";
import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { locationErrorAtom, userSettingsAtom, weatherAtom } from "@/stores/widgets";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { PlaceResponse } from "@/types/widgets/weather";
import { useTranslation } from "react-i18next";
import i18n from "@/config/i18n";

type WeatherLayoutProps = {
	children: ReactNode;
};
const WeatherLayout = ({ children }: WeatherLayoutProps) => {
	const [weather, setWeather] = useAtom(weatherAtom);
	const [locationError, setLocationError] = useAtom(locationErrorAtom);
	const [userSettings] = useAtom(userSettingsAtom);
	const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			if (weather) return;
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
					{
						city: place.data.name,
						country: place.data.country.toLowerCase(),
						language: userSettings?.language ?? i18n.language,
					},
					{ headers: { Authorization: `Bearer ${accessToken}` } },
				);

				setWeather(weather.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	if (!location && !weather && !locationError) {
		return (
			<>
				<Text style={styles.text}>{t("widgets.weather.loading.location")}</Text>
				<ActivityIndicator size="large" />
			</>
		);
	} else if (!weather && !locationError) {
		return (
			<>
				<Text style={styles.text}>{t("widgets.weather.loading.data")}</Text>
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
