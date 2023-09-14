import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { Socket } from "socket.io-client";
import Icon from "@/components/Icon";
import { useColorScheme } from "@/components/Themed";

export const MessageSender = ({ socket }: { socket: Socket }) => {
	const [message, setMessage] = useState(String);

	const colorScheme = useColorScheme();
	const { t } = useTranslation();

	const sendMessage = (message: string) => {
		socket.emit("global-message", { message });
		setMessage("");
	};

	return (
		<View style={{ flexDirection: "row" }}>
			<TextInput
				style={{ ...styles.textInput, ...(colorScheme === "dark" ? styles.textInputWhite : styles.textInputBlack) }}
				placeholder={t("chat.sendMessage")}
				placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
				onChangeText={setMessage}
				value={message}
			/>
			<TouchableWithoutFeedback
				onPress={() => {
					if (message) sendMessage(message);
				}}
			>
				<Icon name="send" source="FontAwesome" size={25} style={styles.icon} />
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	textInputWhite: {
		borderColor: "#FFF",
		color: "#FFF",
	},
	textInput: {
		margin: 10,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 30,
		backgroundColor: "transparent",
		borderWidth: 1,
		flex: 8,
	},
	textInputBlack: {
		borderColor: "#000",
		color: "#000",
	},
	icon: {
		alignSelf: "center",
		marginRight: 15,
	},
});
