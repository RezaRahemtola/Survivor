import { MessageSender } from "@/components/MessageSender";
import { ChatSocket } from "@/config/socket";
import { MessageReceiveAtom } from "@/stores/chat";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import { Text } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { Socket } from "socket.io-client";

const ChatModal = () => {
	const colorScheme = useColorScheme();
	const [socket, setSocket] = useState<Socket | undefined>(undefined);
	const [messages, setMessageReceived] = useAtom(MessageReceiveAtom);

	useEffect(() => {
		(async () => {
			setSocket(await ChatSocket.getInstance(setMessageReceived));
		})();
	}, []);

	return (
		<View style={styles.view}>
			<FlatList
				inverted
				data={[...messages].reverse()}
				renderItem={({ item }) => (
					<View>
						<View
							style={
								item.email === "Me"
									? {
											flexDirection: "row",
											justifyContent: "flex-end",
									  }
									: { flexDirection: "row", justifyContent: "flex-start" }
							}
						>
							<Text
								style={{
									marginRight: 20,
									marginLeft: 20,
									fontSize: 12,
								}}
							>
								{item.email}
							</Text>
						</View>
						<View
							style={
								item.email === "Me"
									? {
											flexDirection: "row",
											justifyContent: "flex-end",
									  }
									: { flexDirection: "row", justifyContent: "flex-start" }
							}
						>
							<View style={[styles.textWrap, { backgroundColor: colorScheme === "dark" ? "#666" : "#DDD" }]}>
								<Text>{item.message}</Text>
							</View>
						</View>
					</View>
				)}
			/>
			{socket ? <MessageSender socket={socket} /> : <></>}
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "flex-end",
	},
	textWrap: {
		maxWidth: "70%",
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 15,
		borderRadius: 25,
		margin: 10,
		marginTop: 3,
	},
});

export default ChatModal;
