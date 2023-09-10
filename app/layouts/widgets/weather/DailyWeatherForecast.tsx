import { ScrollView, StyleSheet } from "react-native";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

import DailyWeather from "@/components/widgets/weather/DailyWeatherForecast";
import { Text } from "@/components/Themed";
import { weatherAtom } from "@/stores/widgets";

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
