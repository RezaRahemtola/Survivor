import { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { router } from "expo-router";
import { Socket } from "socket.io-client";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { Card } from "react-native-elements";

import { Text, useThemeColor, View } from "@/components/Themed";
import Icon from "@/components/Icon";
import { MessageSender } from "@/components/MessageSender";
import { MessageReceiveAtom } from "@/stores/chat";
import { Message, MessageReceiveData } from "@/types/chat";
import { ChatSocket } from "@/config/socket";
import SingleMessage from "@/components/chat/SingleMessage";
import axios from "@/config/axios";
import { getAccessToken } from "@/cache/accessToken";
import { ActivityIndicator } from "react-native-paper";
import { userSettingsAtom } from "@/stores/widgets";

const LatestMessages = ({ messages }: { messages: MessageReceiveData[] }) => {
	const { t } = useTranslation();

	if (messages.length === 0) {
		return <Text style={styles.noMessage}>{t("chat.noMessage")}</Text>;
	}
	if (messages.length === 1) {
		return <SingleMessage message={messages.at(-1)!} />;
	}
	if (messages.length > 1) {
		return (
			<>
				<SingleMessage message={messages.at(-2)!} />
				<SingleMessage message={messages.at(-1)!} />
			</>
		);
	}
};

const GeneralChatCard = () => {
	const [userSettings] = useAtom(userSettingsAtom);
	const [messages, setMessageReceived] = useAtom(MessageReceiveAtom);
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const { t } = useTranslation();
	const backgroundColor = useThemeColor({}, "background");

	useEffect(() => {
		(async () => {
			const accessToken = await getAccessToken();
			const response = await axios.get<Message[]>("/messages", {
				params: { take: 25 },
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			const fetchedMessages = response.data.reverse();
			setMessageReceived(
				fetchedMessages.map<MessageReceiveData>((message) => ({
					email: message.sender === userSettings?.email ? "Me" : message.sender,
					message: message.content,
				})),
			);
			setSocket(await ChatSocket.getInstance(setMessageReceived));
			setIsLoading(false);
		})();
	}, []);

	return (
		<Card containerStyle={{ backgroundColor }}>
			<View style={styles.Header}>
				<Text style={styles.title}>{t("tabs.chat")}</Text>
				<TouchableWithoutFeedback onPress={() => router.push("/chat/modal")}>
					<Icon name="resize-full-screen" source="Entypo" size={25} style={styles.fullScreenIcon} />
				</TouchableWithoutFeedback>
			</View>
			{socket && !isLoading ? (
				<>
					<LatestMessages messages={messages} />
					<MessageSender socket={socket} />
				</>
			) : (
				<ActivityIndicator size="large" />
			)}
		</Card>
	);
};

const styles = StyleSheet.create({
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
	noMessage: {
		fontSize: 16,
		alignSelf: "center",
		right: 0,
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
		marginRight: 80,
	},
});

export default GeneralChatCard;
