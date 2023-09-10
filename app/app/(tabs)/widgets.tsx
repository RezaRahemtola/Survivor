import { ScrollView, StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import WidgetsLayout from "@/layouts/widgets/WidgetsLayout";
import { Text } from "@/components/Themed";
import { useTranslation } from "react-i18next";

const WidgetScreen = () => {
	const [userSettings] = useAtom(userSettingsAtom);
	const [editionWidgets] = useAtom(editionWidgetsAtom);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			{editionWidgets.length === 0 ? (
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Text style={styles.noWidget}>{t("widgets.noWidgets")}</Text>
				</ScrollView>
			) : (
				<></>
			)}
			<WidgetsLayout widgets={userSettings?.widgets ?? []} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	noWidget: {
		fontSize: 25,
		marginBottom: 20,
	},
});

export default WidgetScreen;
