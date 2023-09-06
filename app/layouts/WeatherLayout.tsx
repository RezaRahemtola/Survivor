import { locationAtom, locationErrorAtom, weatherAtom } from "@/stores/widgets";
import { useAtom } from "jotai";
import * as Location from "expo-location";
import { ReactNode } from "react";
import axios from "axios";

import { Text } from "@/components/Themed";

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
		return <Text>Waiting for location access..</Text>;
	} else if (!weather && !locationError) {
		fetchWeather();
		return <Text>Weather data loading...</Text>;
	} else if (locationError) {
		return <Text>{locationError}</Text>;
	}

	return <>{children}</>;
};

export default WeatherLayout;
