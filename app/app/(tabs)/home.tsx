import { ScrollView, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useAtom } from "jotai";

import TrendNewsLayout from "@/layouts/TrendNewsLayout";
import WeatherLayout from "@/layouts/WeatherLayout";
import CurrentWeatherForecast from "@/components/weather/CurrentWeatherForecast";
import DailyWeatherForecast from "@/layouts/DailyWeatherForecast";
import { WidgetType } from "@/types/widgets";
import { UserSettings } from "@/types/settings";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { Text } from "@/components/Themed";
import { userSettingsAtom } from "@/stores/widgets";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import IcelandCarpoolingLayout from "@/layouts/IcelandCarpoolingLayout";
import NBARandomGamesLayout from "@/layouts/NBARandomGamesLayout";

const WidgetComponent = ({ name }: { name: WidgetType }) => {
	switch (name) {
		case "trendingNews":
			return <TrendNewsLayout />;
		case "currentWeather":
			return (
				<WeatherLayout>
					<CurrentWeatherForecast />
				</WeatherLayout>
			);
		case "weatherWeekForecast":
			return (
				<WeatherLayout>
					<DailyWeatherForecast />
				</WeatherLayout>
			);
		case "icelandCarpooling":
			return <IcelandCarpoolingLayout />;
		case "nbaGames":
			return <NBARandomGamesLayout />;
	}
};

export default function HomeScreen() {
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<UserSettings>(`/user-settings`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setUserSettings(response.data);
				i18next.changeLanguage(response.data.language);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<ScrollView style={styles.container}>
			{userSettings?.widgets.map((widget, index) => <WidgetComponent name={widget} key={index} />)}
			{userSettings?.widgets.length === 0 ? (
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Text style={styles.noWidget}>{t("widgets.noWidgets")}</Text>
				</ScrollView>
			) : (
				<></>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	noWidget: {
		fontSize: 25,
	},
});
