import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Socket } from "socket.io-client";

import { MessageSender } from "@/components/MessageSender";
import { ChatSocket } from "@/config/socket";
import { globalMessageReceiveAtom } from "@/stores/chat";
import SingleMessage from "@/components/chat/SingleMessage";
import { Message, MessageReceiveData } from "@/types/chat";
import { userSettingsAtom } from "@/stores/widgets";
import { useLocalSearchParams } from "expo-router";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";

const ChatModal = () => {
	const options = useLocalSearchParams<{ type: "global" } | { type: "direct"; withUser: string }>();
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [messages, setMessageReceived] =
		options.type === "global" ? useAtom(globalMessageReceiveAtom) : useState<MessageReceiveData[]>([]);
	const [userSettings] = useAtom(userSettingsAtom);

	useEffect(() => {
		(async () => {
			if (userSettings) {
				if (options.type === "direct") {
					const accessToken = await getAccessToken();
					const response = await axios.get<Message[]>(`/messages/${options.withUser}`, {
						params: { take: 25 },
						headers: { Authorization: `Bearer ${accessToken}` },
					});
					const fetchedMessages = response.data.reverse();
					setMessageReceived(
						fetchedMessages.map<MessageReceiveData>((message) => ({
							email: message.sender === userSettings.email ? "Me" : message.sender,
							message: message.content,
						})),
					);
				}
				setSocket(await ChatSocket.getInstance(options.type, setMessageReceived, userSettings!.email));
			}
		})();
	}, []);

	return (
		<View style={styles.view}>
			<FlatList
				data={messages.filter(({ email }) => options.type === "global" || [options.withUser, "Me"].includes(email))}
				renderItem={({ item }) => <SingleMessage message={item} />}
			/>
			{socket ? (
				<MessageSender toUser={options.type === "global" ? undefined : options.withUser} socket={socket} />
			) : (
				<></>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "flex-end",
	},
});

export default ChatModal;
