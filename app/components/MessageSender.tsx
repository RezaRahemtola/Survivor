import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { Socket } from "socket.io-client";
import { useAtom } from "jotai";
import { MessageReceiveAtom } from "@/stores/chat";
import Icon from "@/components/Icon";

export const MessageSender = ({ socket }: { socket: Socket }) => {
	const [message, setMessage] = useState(String);
	const [, setMessageReceived] = useAtom(MessageReceiveAtom);

	const sendMessage = (message: string) => {
		socket.emit("global-message", { message: `${message} (${socket.id})` });
		setMessageReceived((oldList) => [...oldList, { message: message, email: "Me" }]);
		setMessage("");
	};

	const colorScheme = useColorScheme();
	const { t } = useTranslation();

	return (
		<View style={{ flexDirection: "row" }}>
			<TextInput
				style={colorScheme === "dark" ? styles.textInputWhite : styles.textInputBlack}
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
		margin: 10,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 30,
		backgroundColor: "transparent",
		borderColor: "#FFFFFF",
		borderWidth: 1,
		color: "#FFFFFF",
		flex: 8,
	},
	textInputBlack: {
		margin: 10,
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 30,
		backgroundColor: "transparent",
		borderColor: "#000000",
		borderWidth: 1,
		color: "#000000",
		flex: 8,
	},
	icon: {
		alignSelf: "center",
		marginRight: 15,
	},
});
