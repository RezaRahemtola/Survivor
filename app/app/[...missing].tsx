import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useTranslation } from "react-i18next";

const NotFoundScreen = () => {
	const { t } = useTranslation();
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text style={styles.title}>{t("screen.missing.title")}</Text>
				<Link href="/(tabs)/home" style={styles.link}>
					<Text style={styles.linkText}>{t("screen.missing.homeRedirection")}</Text>
				</Link>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});
