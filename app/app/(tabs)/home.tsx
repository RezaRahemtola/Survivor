import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { UserSettings } from "@/types/settings";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import i18next from "i18next";
import WidgetsLayout from "@/layouts/widgets/WidgetsLayout";
import { Text } from "@/components/Themed";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
	const [editionWidgets, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<UserSettings>(`/user-settings`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setUserSettings(response.data);
				setEditionWidgets(response.data.widgets);
				await i18next.changeLanguage(response.data.language);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			{editionWidgets.length === 0 ? (
				<ScrollView contentContainerStyle={styles.contentContainer}>
					<Text style={styles.noWidget}>{t("widgets.noWidgets")}</Text>
				</ScrollView>
			) : (
				<WidgetsLayout widgets={userSettings?.widgets ?? []} onSave={() => {}} />
			)}
		</View>
	);
}

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
	},
});
