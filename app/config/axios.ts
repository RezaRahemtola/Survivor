import axios, { AxiosError, isAxiosError } from "axios";
import { router } from "expo-router";

import { removeAccessToken } from "@/cache/accessToken";

const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: Error | AxiosError) => {
		if (isAxiosError(error) && error.response?.status === 401 && !error.request.responseURL.includes("/external")) {
			await removeAccessToken();
			router.push("/sign-in");
		}
		throw error;
	},
);

export default axiosInstance;
