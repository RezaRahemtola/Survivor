import { Image, StyleSheet } from "react-native";
// @ts-ignore
import styled from "styled-components/native";

import dayjs from "@/config/dayjs";
import { Text } from "@/components/Themed";

const DailyWeatherForecast = ({ day }: { day: any }) => {
	return (
		<DayContainer>
			<DateContainer>
				<Text style={styles.weekday}>
					{dayjs()
						.weekday(dayjs(day.dt * 1000).day())
						.format("ddd")}
				</Text>
			</DateContainer>
			<IconTempView>
				<Image
					style={styles.weatherIcon}
					source={{
						uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
					}}
					resizeMode={"contain"} // cover or contain its upto you view look
				/>
				<Text>{day.weather[0].description}</Text>
			</IconTempView>
			<DegreeView>
				<Text style={styles.degree}>{Math.round(day.temp.max)}°C</Text>
				<Text style={styles.feelsLike}>Feels {Math.round(day.feels_like.day)}°C</Text>
			</DegreeView>
		</DayContainer>
	);
};

const styles = StyleSheet.create({
	weekday: {
		fontSize: 24,
		textAlign: "center",
		margin: 3,
	},
	degree: {
		fontSize: 24,
	},
	feelsLike: {
		fontSize: 14,
	},
	weatherIcon: {
		width: 50,
		height: 50,
	},
});

const DayContainer = styled.View`
	padding: 10px;
	border: rgba(255, 255, 255, 0.6) 1px;
	border-radius: 10px;
	margin: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 95%;
	max-width: 478px;
`;

const DateContainer = styled.View`
	text-align: right;
	flex: 1;
`;

const IconTempView = styled.View`
	text-align: center;
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 2;
`;

const DegreeView = styled.View`
	text-align: center;
	flex: 1;
`;

export default DailyWeatherForecast;
