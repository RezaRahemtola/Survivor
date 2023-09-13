import { Card } from "react-native-elements";
import { Text, useThemeColor } from "@/components/Themed";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "@/components/Icon";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

const CommunicationCard = () => {
	const backgroundColor = useThemeColor({}, "background");
	const { t } = useTranslation();

	const slackWorkspace = process.env.EXPO_PUBLIC_SLACK_WORKSPACE;
	const discordEnabled = process.env.EXPO_PUBLIC_DISCORD_ENABLED;
	const elementEnabled = process.env.EXPO_PUBLIC_ELEMENT_ENABLED;
	const hangoutsEnabled = process.env.EXPO_PUBLIC_HANGOUTS_ENABLED;

	if (!slackWorkspace && !discordEnabled && !elementEnabled && !hangoutsEnabled) return <></>;

	return (
		<Card containerStyle={{ ...styles.container, backgroundColor }}>
			<Text style={styles.title}>{t("widgets.communication")}</Text>

			{discordEnabled ? (
				<View>
					<TouchableOpacity
						style={styles.lineView}
						onPress={() =>
							router.push({
								pathname: "/widgets/webview",
								params: {
									url: "https://discord.com/app",
								},
							})
						}
					>
						<Icon name="discord" source="MaterialCommunityIcons" size={24} />
						<Text style={styles.toolName}>Discord</Text>
					</TouchableOpacity>
				</View>
			) : (
				<></>
			)}

			{slackWorkspace ? (
				<View>
					<TouchableOpacity
						style={styles.lineView}
						onPress={() =>
							router.push({
								pathname: "/widgets/webview",
								params: {
									url: slackWorkspace,
								},
							})
						}
					>
						<Icon name="slack" source="MaterialCommunityIcons" size={24} />
						<Text style={styles.toolName}>Slack</Text>
					</TouchableOpacity>
				</View>
			) : (
				<></>
			)}

			{elementEnabled ? (
				<View>
					<TouchableOpacity
						style={styles.lineView}
						onPress={() =>
							router.push({
								pathname: "/widgets/webview",
								params: {
									url: "https://app.element.io/",
								},
							})
						}
					>
						<Icon name="message" source="MaterialIcons" size={24} />
						<Text style={styles.toolName}>Element</Text>
					</TouchableOpacity>
				</View>
			) : (
				<></>
			)}

			{hangoutsEnabled ? (
				<View>
					<TouchableOpacity
						style={styles.lineView}
						onPress={() =>
							router.push({
								pathname: "/widgets/webview",
								params: {
									url: "https://hangouts.google.com/",
								},
							})
						}
					>
						<Icon name="google-hangouts" source="MaterialCommunityIcons" size={24} />
						<Text style={styles.toolName}>Hangouts</Text>
					</TouchableOpacity>
				</View>
			) : (
				<></>
			)}
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	lineView: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 10,
	},
	toolName: {
		marginLeft: 5,
		fontSize: 16,
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
	},
});

export default CommunicationCard;
