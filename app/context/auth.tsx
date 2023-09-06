import { router, useRootNavigationState, useSegments } from "expo-router";
import React, { ComponentProps, createContext, useContext, useEffect, useMemo, useState } from "react";

import { AuthUser } from "@/types/user";
import axios from "@/config/axios";

type AuthContextType = {
	signIn: (email: string, password: string) => void;
	signOut: () => void;
	user: AuthUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("context used outside of provider.");
	return context;
};

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user: AuthUser | null) => {
	const segments = useSegments();
	const navigationState = useRootNavigationState();

	useEffect(() => {
		if (!navigationState?.key) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (
			// If the user is not signed in and the initial segment is not anything in the auth group.
			user === null &&
			!inAuthGroup
		) {
			// Redirect to the sign-in page.
			router.replace("/sign-in");
		} else if (user !== null && inAuthGroup) {
			// Redirect to the home page
			router.replace("/(tabs)/home");
		}
	}, [user, segments, navigationState]);
};

const Provider = (props: ComponentProps<any>) => {
	const [user, setUser] = useState<AuthUser | null>(null);

	useProtectedRoute(user);

	const authValue = useMemo(
		() => ({
			signIn: (email: string, password: string) => {
				axios
					.post<AuthUser>("/auth/login", { email, password })
					.then((response) => {
						const user = response.data;
						setUser(user);
						router.push("/(tabs)/home");
					})
					.catch((error) => {
						console.log(error);
						console.log(error.status);
					});
			},
			signOut: () => {
				setUser(null);
				router.replace("/sign-in");
			},
			user,
		}),
		[user],
	);

	return <AuthContext.Provider value={authValue}>{props.children}</AuthContext.Provider>;
};

export default Provider;
