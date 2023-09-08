import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { signIn } from "@/config/auth";
import { Text, useThemeColor } from "@/components/Themed";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const borderColor = useThemeColor({ light: "black", dark: "white" }, "background");
	const textColor = useThemeColor({}, "text");

	return (
		<View style={styles.container}>
			{error ? (
				<Text lightColor="red" darkColor="red" style={styles.errorMessage}>
					{error}
				</Text>
			) : (
				<></>
			)}

			<TextInput
				value={email}
				onChangeText={(value) => setEmail(value)}
				placeholder={"Email"}
				style={{ ...styles.input, borderColor, color: textColor }}
			/>
			<TextInput
				value={password}
				onChangeText={(value) => setPassword(value)}
				placeholder={"Password"}
				secureTextEntry
				style={{ ...styles.input, borderColor, color: textColor }}
			/>

			<Button
				title={"Login"}
				onPress={async () => {
					const signedIn = await signIn(email, password);
					setError(signedIn ? "" : "Invalid email and/or password, please try again.");
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
