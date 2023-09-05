import { StyleSheet } from "react-native";

import DailyWeather from "@/components/weather/DailyWeatherForecast";
import { Text } from "@/components/Themed";

const DailyWeatherForecast = ({ weather }: any) => (
	<>
		{weather.daily ? (
			weather.daily.map((day: any) => {
				return <DailyWeather key={day.dt} day={day} />;
			})
		) : (
			<Text style={styles.noWeather}>No Weather to show</Text>
		)}
	</>
);

const styles = StyleSheet.create({
	noWeather: {
		textAlign: "center",
	},
});
export default DailyWeatherForecast;
