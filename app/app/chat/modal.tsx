import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Socket } from "socket.io-client";

import { MessageSender } from "@/components/MessageSender";
import { ChatSocket } from "@/config/socket";
import { MessageReceiveAtom } from "@/stores/chat";
import SingleMessage from "@/components/chat/SingleMessage";

const ChatModal = () => {
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [messages, setMessageReceived] = useAtom(MessageReceiveAtom);

	useEffect(() => {
		(async () => {
			setSocket(await ChatSocket.getInstance(setMessageReceived));
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
