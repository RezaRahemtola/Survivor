import axios from "@/config/axios";
import { AuthRequest } from "@/types/auth";
import { removeAccessToken, setAccessToken } from "@/cache/accessToken";
import { router } from "expo-router";

export const signIn = async (email: string, password: string) => {
	try {
		const response = await axios.post<AuthRequest>("/auth/login", { email, password });
		await setAccessToken(response.data.access_token);
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push("/(tabs)/home");
		}
	} catch (error) {
		console.log(error);
	}
};

export const signOut = async () => {
	await removeAccessToken();
	router.push("/sign-in");
};
