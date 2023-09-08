import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { signIn } from "@/config/auth";
import { Text, useThemeColor } from "@/components/Themed";
import { useTranslation } from "react-i18next";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isWrongCredentials, setIsWrongCredentials] = useState(false);
	const borderColor = useThemeColor({ light: "black", dark: "white" }, "background");
	const textColor = useThemeColor({}, "text");
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			{isWrongCredentials ? (
				<Text lightColor="red" darkColor="red" style={styles.errorMessage}>
					{t("user.signIn.wrongCredentials")}
				</Text>
			) : (
				<></>
			)}

			<TextInput
				value={email}
				onChangeText={(value) => setEmail(value)}
				placeholder={t("user.signIn.email")}
				style={{ ...styles.input, borderColor, color: textColor }}
			/>
			<TextInput
				value={password}
				onChangeText={(value) => setPassword(value)}
				placeholder={t("user.signIn.password")}
				secureTextEntry
				style={{ ...styles.input, borderColor, color: textColor }}
			/>

			<Button
				title={t("user.signIn.action")}
				onPress={async () => {
					const signedIn = await signIn(email, password);
					setIsWrongCredentials(!signedIn);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		width: 200,
		height: 44,
		padding: 10,
		borderWidth: 1,
		marginBottom: 10,
	},
	errorMessage: {
		marginBottom: 20,
	},
});
