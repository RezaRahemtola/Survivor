import { MessageReceiveData } from "@/types/chat";
import { StyleSheet, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "@/components/Themed";

const SingleMessage = ({ message }: { message: MessageReceiveData }) => {
	const colorScheme = useColorScheme();
	const { t } = useTranslation();

	return (
		<>
			<View
				style={[
					styles.HeaderMessageReceive,
					message.email === "Me"
						? {
								flexDirection: "row",
								justifyContent: "flex-end",
						  }
						: { flexDirection: "row", justifyContent: "flex-start" },
				]}
			>
				<Text style={[styles.TextMessage]}> {message.email === "Me" ? t("chat.me") : message.email}</Text>
			</View>
			<View
				style={
					message.email === "Me"
						? {
								flexDirection: "row",
								justifyContent: "flex-end",
						  }
						: { flexDirection: "row", justifyContent: "flex-start" }
				}
			>
				<View style={[styles.messageReceived, { backgroundColor: colorScheme === "dark" ? "#666" : "#EEE" }]}>
					<Text> {message.message} </Text>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
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
});

export default SingleMessage;
