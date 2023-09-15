import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Socket } from "socket.io-client";

import { MessageSender } from "@/components/MessageSender";
import { ChatSocket } from "@/config/socket";
import { globalMessageReceiveAtom } from "@/stores/chat";
import SingleMessage from "@/components/chat/SingleMessage";
import { MessageReceiveData } from "@/types/chat";
import { userSettingsAtom } from "@/stores/widgets";

const ChatModal = (options: { type: "global" } | { type: "direct"; withUser: string }) => {
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [messages, setMessageReceived] =
		options.type === "global" ? useAtom(globalMessageReceiveAtom) : useState<MessageReceiveData[]>([]);
	const [userSettings] = useAtom(userSettingsAtom);

	useEffect(() => {
		(async () => {
			setSocket(await ChatSocket.getInstance(options.type, setMessageReceived, userSettings!.email));
		})();
	}, []);

	return (
		<View style={styles.view}>
			<FlatList data={messages} renderItem={({ item }) => <SingleMessage message={item} />} />
			{socket ? <MessageSender socket={socket} /> : <></>}
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
