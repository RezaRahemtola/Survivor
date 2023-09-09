import { ScrollView, StyleSheet } from "react-native";

import DailyWeather from "@/components/weather/DailyWeatherForecast";
import { Text } from "@/components/Themed";
import { useAtom } from "jotai";
import { weatherAtom } from "@/stores/widgets";
import { useTranslation } from "react-i18next";

const DailyWeatherForecast = () => {
	const [weather] = useAtom(weatherAtom);
	const { t } = useTranslation();

	return (
		<ScrollView>
			{weather.daily ? (
				weather.daily.map((day: any, index: number) => {
					if (index !== 0) {
						return <DailyWeather key={day.dt} day={day} />;
					}
				})
			) : (
				<Text style={styles.noWeather}>{t("widgets.notAvailable")}</Text>
			)}
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	noWeather: {
		textAlign: "center",
	},
});

export default DailyWeatherForecast;
