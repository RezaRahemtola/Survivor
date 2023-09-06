import React from "react";
import { StyleSheet } from "react-native";
// @ts-ignore
import styled from "styled-components/native";
import { Text } from "@/components/Themed";
import { useAtom } from "jotai/index";
import { weatherAtom } from "@/stores/widgets";

const CurrentWeatherForecast = () => {
	const [weather] = useAtom(weatherAtom);

	return (
		<CurrentView>
			<Text style={styles.timezone}>{weather.timezone}</Text>
			<MainInfoContainer>
				<CurrentTempView>
					{weather.current && (
						<WeatherIcon
							source={{
								uri: `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
							}}
							resizeMode={"contain"}
						/>
					)}
					<Text style={styles.currentDegrees}>
						{Math.round(weather.current?.temp)}
						°C
					</Text>
				</CurrentTempView>
				<Text style={styles.details}>{weather.current?.weather[0].description}</Text>
			</MainInfoContainer>
			<SecondaryInfoContainer>
				<Row>
					<DetailsBox>
						<Text style={styles.labels}>Feels</Text>
						<Text style={styles.details}>
							{weather.current && Math.round(weather.current.feels_like)}
							°C
						</Text>
					</DetailsBox>
					<DetailsBox>
						<Text style={styles.labels}>Low</Text>
						<Text style={styles.details}>
							{weather.daily && Math.round(weather.daily[0].temp.min)}
							°C
						</Text>
					</DetailsBox>
					<DetailsBox>
						<Text style={styles.labels}>High</Text>
						<Text style={styles.details}>
							{weather.daily && Math.round(weather.daily[0].temp.max)}
							°C
						</Text>
					</DetailsBox>
				</Row>
				<Row>
					<DetailsBox>
						<Text style={styles.labels}>Wind</Text>
						<Text style={styles.details}>{weather.current?.wind_speed} m/s</Text>
					</DetailsBox>
					<DetailsBox>
						<Text style={styles.labels}>Humidity</Text>
						<Text style={styles.details}>{weather.current?.humidity}%</Text>
					</DetailsBox>
					<DetailsBox>
						<Text style={styles.labels}>Rain</Text>
						<Text style={styles.details}>{weather.daily > 0 ? weather.daily[0].rain : "0"} MM</Text>
					</DetailsBox>
				</Row>
			</SecondaryInfoContainer>
		</CurrentView>
	);
};

const styles = StyleSheet.create({
	timezone: {
		display: "flex",
		justifyContent: "center",
		marginTop: 10,
		fontSize: 15,
	},
	currentDegrees: {
		display: "flex",
		justifyContent: "center",
		marginTop: 10,
		fontSize: 60,
	},
	details: {
		fontSize: 15,
		textTransform: "capitalize",
	},
	labels: {
		fontSize: 18,
	},
});

const CurrentView = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const CurrentTempView = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const MainInfoContainer = styled.View`
	display: flex;
	align-items: center;
`;

const SecondaryInfoContainer = styled.View`
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px 10px;
	width: 95%;
	max-width: 478px;
`;

const WeatherIcon = styled.Image`
	width: 50px;
	height: 50px;
`;

const Row = styled.View`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	color: black;
	padding: 10px 30px;
`;

const DetailsBox = styled.View`
	display: flex;
`;

export default CurrentWeatherForecast;
