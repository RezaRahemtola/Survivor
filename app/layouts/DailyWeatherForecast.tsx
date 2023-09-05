// @ts-ignore
import styled from "styled-components/native";

import DailyWeather from "@/components/weather/DailyWeatherForecast";

const DailyWeatherForecast = ({ weather }: any) => {
	return (
		<>
			{weather.daily ? (
				weather.daily.map((day: any, index: number) => {
					return <DailyWeather key={day.dt} day={day} index={index} />;
				})
			) : (
				<NoWeather>No Weather to show</NoWeather>
			)}
		</>
		// <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
		// 	<FutureForecastContainer>
		// 		{weather.daily ? (
		// 			weather.daily.map((day: any, index: number) => {
		// 				return <DailyWeather key={day.dt} day={day} index={index} />;
		// 			})
		// 		) : (
		// 			<NoWeather>No Weather to show</NoWeather>
		// 		)}
		// 	</FutureForecastContainer>
		// </ScrollView>
	);
};

const FutureForecastContainer = styled.View`
	//display: flex;
	//align-items: center;
	//justify-content: center;
`;

const NoWeather = styled.Text`
	text-align: center;
	color: white;
`;

export default DailyWeatherForecast;
