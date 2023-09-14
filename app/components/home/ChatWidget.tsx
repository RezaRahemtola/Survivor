import { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { Card } from "react-native-elements";

import { Text, useThemeColor, View } from "@/components/Themed";
import Icon from "@/components/Icon";
import { MessageSender } from "@/components/MessageSender";
import { MessageReceiveAtom } from "@/stores/chat";
import { MessageReceiveData } from "@/types/chat";
import { ChatSocket } from "@/config/socket";

const LatestMessage = ({ message }: { message: MessageReceiveData[] }) => {
	const colorScheme = useColorScheme();
	const { t } = useTranslation();

	if (message.length === 0) {
		return <Text style={styles.NoMessage}>{t("chat.noMessage")}</Text>;
	}
	if (message.length === 1) {
		return (
			<>
				<View
					style={[
						styles.HeaderMessageReceive,
						message.at(-1)?.email === "Me"
							? {
									flexDirection: "row",
									justifyContent: "flex-end",
							  }
							: { flexDirection: "row", justifyContent: "flex-start" },
					]}
				>
					<Text style={[styles.TextMessage]}>
						{" "}
						{message.at(-1)?.email === "Me" ? t("chat.me") : message.at(-1)?.email}
					</Text>
				</View>
				<View
					style={
						message.at(-1)?.email === "Me"
							? {
									flexDirection: "row",
									justifyContent: "flex-end",
							  }
							: { flexDirection: "row", justifyContent: "flex-start" }
					}
				>
					<View style={[styles.messageReceived, { backgroundColor: colorScheme === "dark" ? "#666" : "#EEE" }]}>
						<Text> {message.at(-1)?.message} </Text>
					</View>
				</View>
			</>
		);
	}
	if (message.length > 1) {
		return (
			<>
				<View
					style={[
						styles.HeaderMessageReceive,
						message.at(-2)?.email === "Me"
							? {
									flexDirection: "row",
									justifyContent: "flex-end",
							  }
							: { flexDirection: "row", justifyContent: "flex-start" },
					]}
				>
					<Text style={[styles.TextMessage]}>
						{" "}
						{message.at(-1)?.email === "Me" ? t("chat.me") : message.at(-1)?.email}
					</Text>
				</View>
				<View
					style={
						message.at(-2)?.email === "Me"
							? {
									flexDirection: "row",
									justifyContent: "flex-end",
							  }
							: { flexDirection: "row", justifyContent: "flex-start" }
					}
				>
					<View style={[styles.messageReceived, { backgroundColor: colorScheme === "dark" ? "#666" : "#EEE" }]}>
						<Text> {message.at(-2)?.message} </Text>
					</View>
				</View>
				<View
					style={[
						styles.HeaderMessageReceive,
						message.at(-1)?.email === "Me"
							? {
									flexDirection: "row",
									justifyContent: "flex-end",
							  }
							: { flexDirection: "row", justifyContent: "flex-start" },
					]}
				>
					<Text style={[styles.TextMessage]}>
						{" "}
						{message.at(-1)?.email === "Me" ? t("chat.me") : message.at(-1)?.email}
					</Text>
				</View>
				<View
					style={
						message.at(-1)?.email === "Me"
							? {
									flexDirection: "row",
									justifyContent: "flex-end",
							  }
							: { flexDirection: "row", justifyContent: "flex-start" }
					}
				>
					<View style={[styles.messageReceived, { backgroundColor: colorScheme === "dark" ? "#666" : "#EEE" }]}>
						<Text> {message.at(-1)?.message} </Text>
					</View>
				</View>
			</>
		);
	}
};

const ChatWidget = () => {
	const [messages, setMessageReceived] = useAtom(MessageReceiveAtom);
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const { t } = useTranslation();
	const backgroundColor = useThemeColor({}, "background");

	useEffect(() => {
		(async () => {
			setSocket(await ChatSocket.getInstance(setMessageReceived));
		})();
	}, []);

	return (
		<>
			{socket ? (
				<Card containerStyle={{ backgroundColor }}>
					<View style={styles.Header}>
						<TouchableWithoutFeedback onPress={() => router.push("/home/modal")}>
							<Icon name="resize-full-screen" source="Entypo" size={25} style={styles.fullScreenIcon} />
						</TouchableWithoutFeedback>
					</View>
					<LatestMessage message={messages} />
					<MessageSender socket={socket} />
				</Card>
			) : (
				<></>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	tchatPreview: {
		marginTop: 20,
		borderRadius: 20,
		paddingBottom: 5,
		marginHorizontal: 10,
	},
	fullScreenIcon: {
		marginBottom: 10,
	},
	messageReceived: {
		maxWidth: "70%",
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 15,
		borderRadius: 25,
		margin: 10,
		marginTop: 3,
	},
	HeaderMessageReceive: {
		marginLeft: 10,
	},
	TextMessage: {
		marginRight: 20,
		marginLeft: 20,
		fontSize: 12,
	},
	Header: {
		flexDirection: "row",
		justifyContent: "flex-end",
		backgroundColor: "transparent",
	},
	MessageSender: {
		flexDirection: "row",
		marginHorizontal: 10,
		paddingTop: 20,
	},
	NoMessage: {
		fontSize: 25,
		alignSelf: "center",
	},
});

export default ChatWidget;
