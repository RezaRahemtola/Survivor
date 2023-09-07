import { Button, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import { signIn } from "@/config/auth";

export default function SignIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View style={styles.container}>
			<TextInput
				value={username}
				onChangeText={(value) => setUsername(value)}
				placeholder={"Username"}
				style={styles.input}
			/>
			<TextInput
				value={password}
				onChangeText={(value) => setPassword(value)}
				placeholder={"Password"}
				secureTextEntry
				style={styles.input}
			/>

			<Button title={"Login"} onPress={() => signIn(username, password)} />
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
		borderColor: "black",
		marginBottom: 10,
	},
});
