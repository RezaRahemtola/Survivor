import { router, useRootNavigationState, useSegments } from "expo-router";
import { ComponentProps, createContext, useContext, useEffect, useMemo, useState } from "react";

import axios from "@/config/axios";
import { AuthRequest } from "@/types/auth";

type AuthContextType = {
	signIn: (email: string, password: string) => void;
	signOut: () => void;
	accessToken: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("context used outside of provider.");
	return context;
};

const useProtectedRoute = (accessToken: string | null) => {
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
	const [accessToken, setAccessToken] = useState<string | null>(null);

	useProtectedRoute(accessToken);

	const authValue = useMemo(
		() => ({
			signIn: (email: string, password: string) => {
				axios
					.post<AuthRequest>("/auth/login", { email, password })
					.then((response) => {
						setAccessToken(response.data.access_token);
						router.push("/(tabs)/home");
					})
					.catch((error) => {
						console.log(error);
						console.log(error.status);
					});
			},
			signOut: () => {
				setAccessToken(null);
				router.replace("/sign-in");
			},
			accessToken,
		}),
		[accessToken],
	);

	return <AuthContext.Provider value={authValue}>{props.children}</AuthContext.Provider>;
};

export default Provider;
