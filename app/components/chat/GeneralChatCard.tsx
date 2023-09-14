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
import { MessageReceiveData } from "@/types/chat";
import { ChatSocket } from "@/config/socket";
import SingleMessage from "@/components/chat/SingleMessage";

const LatestMessage = ({ message }: { message: MessageReceiveData[] }) => {
	const { t } = useTranslation();

	if (message.length === 0) {
		return <Text style={styles.noMessage}>{t("chat.noMessage")}</Text>;
	}
	if (message.length === 1) {
		return <SingleMessage message={message.at(-1)!} />;
	}
	if (message.length > 1) {
		return (
			<>
				<SingleMessage message={message.at(-2)!} />
				<SingleMessage message={message.at(-1)!} />
			</>
		);
	}
};

const GeneralChatCard = () => {
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
						<Text style={styles.title}>{t("tabs.chat")}</Text>
						<TouchableWithoutFeedback onPress={() => router.push("/chat/modal")}>
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
