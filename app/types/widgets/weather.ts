export type PlaceResponse = {
	country: string;
	lat: number;
	local_names: Record<string, string>;
	lon: number;
	name: string;
	state: string;
};

type BaseWeatherPeriodData = {
	dt: number;
	sunrise: number;
	sunset: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	uvi: number;
	clouds: number;
};

type WeatherContentData = {
	id: string;
	main: string;
	description: string;
	icon: string;
};

export type WeatherDayData = BaseWeatherPeriodData & {
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: {
		day: number;
		min: number;
		max: number;
		night: number;
		eve: number;
		morn: number;
	};
	feels_like: {
		day: number;
		night: number;
		eve: number;
		morn: number;
	};
	weather: WeatherContentData[];
	pop: number;
	rain: number;
};

type WeatherCurrentData = BaseWeatherPeriodData & {
	temp: number;
	feels_like: number;
	weather: WeatherContentData[];
};

export type WeatherData = {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: WeatherCurrentData;
	daily: WeatherDayData[];
};
