import { router, useRootNavigationState, useSegments } from "expo-router";
import { ComponentProps, createContext, useContext, useEffect, useMemo } from "react";

import axios from "@/config/axios";
import { AuthRequest } from "@/types/auth";
import { getAccessToken, removeAccessToken, setAccessToken } from "@/config/cache";

type AuthContextType = {
	signIn: (email: string, password: string) => void;
	signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("context used outside of provider.");
	return context;
};

const useProtectedRoute = async () => {
	const accessToken = await getAccessToken();
	const segments = useSegments();
	const navigationState = useRootNavigationState();

	useEffect(() => {
		if (!navigationState?.key) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (!accessToken && !inAuthGroup) {
			router.replace("/sign-in");
		} else if (accessToken && inAuthGroup) {
			router.replace("/(tabs)/home");
		}
	}, [accessToken, segments, navigationState]);
};

const Provider = (props: ComponentProps<any>) => {
	useProtectedRoute();

	const authValue = useMemo(
		() => ({
			signIn: async (email: string, password: string) => {
				try {
					const response = await axios.post<AuthRequest>("/auth/login", { email, password });
					await setAccessToken(response.data.access_token);
					router.push("/(tabs)/home");
				} catch (error) {
					console.log(error);
				}
			},
			signOut: async () => {
				await removeAccessToken();
				router.replace("/sign-in");
			},
		}),
		[],
	);

	return <AuthContext.Provider value={authValue}>{props.children}</AuthContext.Provider>;
};

export default Provider;
