import { MessageSender } from "@/components/MessageSender";
import { MessageReceiveAtom } from "@/stores/chat";
import { useAtom } from "jotai";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ChatModal = () => {
	const colorScheme = useColorScheme();
	const [messages] = useAtom(MessageReceiveAtom);

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
								style={[
									colorScheme === "dark" ? styles.textWhite : styles.textBlack,
									{
										marginRight: 20,
										marginLeft: 20,
										fontSize: 12,
									},
								]}
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
							<View style={colorScheme === "dark" ? styles.textWrapWhite : styles.textWrapBlack}>
								<Text style={colorScheme === "dark" ? styles.textBlack : styles.textWhite}>{item.message}</Text>
							</View>
						</View>
					</View>
				)}
			/>
			<MessageSender />
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "flex-end",
	},
	textWrapBlack: {
		maxWidth: "50%",
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 15,
		borderRadius: 25,
		backgroundColor: "#000000",
		margin: 10,
		marginTop: 3,
	},
	textWrapWhite: {
		maxWidth: "50%",
		paddingHorizontal: 15,
		paddingTop: 10,
		paddingBottom: 15,
		borderRadius: 25,
		backgroundColor: "#FFFFFF",
		margin: 10,
		marginTop: 3,
	},
	textBlack: {
		color: "#000000",
	},
	textWhite: {
		color: "#FFFFFF",
	},
});

export default ChatModal;
