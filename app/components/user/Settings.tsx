import { Card } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import SelectDropdown from "react-native-select-dropdown";
import { useAtom } from "jotai";
import { Button } from "react-native-paper";

import { Text, useThemeColor } from "@/components/Themed";
import i18n from "@/config/i18n";
import axios from "@/config/axios";
import { getAccessToken } from "@/cache/accessToken";
import { interfaceSchemes, LanguageType, ThemeType, UserSettings } from "@/types/settings";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import { applyUserSettings } from "@/utils/settings";

type Language = {
	icon: string;
	name: string;
	locale: LanguageType;
};
const languages: Language[] = [
	{ icon: "🇺🇸", name: "English", locale: "en" },
	{ icon: "🇫🇷", name: "Francais", locale: "fr" },
	{ icon: "🇪🇸", name: "Español", locale: "es" },
	{ icon: "🇨🇳", name: "中国人", locale: "zh" },
	{ icon: "🇮🇳", name: "हिंदी", locale: "hi" },
	{ icon: "🇵🇹", name: "Português", locale: "pt" },
	{ icon: "🇯🇵", name: "日本語", locale: "ja" },
	{ icon: "🇩🇪", name: "Deutsch", locale: "de" },
	{ icon: "🇰🇷", name: "한국인", locale: "ko" },
	{ icon: "🇮🇹", name: "Italiano", locale: "it" },
];

const UserSettingsCard = () => {
	const { t } = useTranslation();
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
	const [, setCurrentWidgets] = useAtom(editionWidgetsAtom);

	const onLanguageChange = async (item: Language) => {
		await i18n.changeLanguage(item.locale);
		const newSettings = { language: item.locale };
		await applyUserSettings(newSettings);
		setUserSettings((prev) => ({ ...prev!, ...newSettings }));
	};

	const onThemeChange = async (item: ThemeType) => {
		const newSettings = { interfaceScheme: item };
		await applyUserSettings(newSettings);
		setUserSettings((prev) => ({ ...prev!, ...newSettings }));
	};

	const onSettingsReset = async () => {
		try {
			const accessToken = await getAccessToken();
			const response = await axios.patch<UserSettings>(
				"/user-settings/reset",
				{},
				{ headers: { Authorization: `Bearer ${accessToken}` } },
			);
			setUserSettings(response.data);
			setCurrentWidgets(response.data.widgets);
			await i18n.changeLanguage(response.data.language);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Card containerStyle={{ backgroundColor: useThemeColor({}, "background") }}>
			<Text style={styles.title}>{t("user.settings.title")}</Text>
			<View style={styles.settingsView}>
				<Text style={styles.settingsText}>{t("user.settings.language")}</Text>
				<SelectDropdown
					data={languages}
					defaultValue={languages.find((language) => language.locale === userSettings?.language) ?? "en"}
					buttonTextAfterSelection={(item: Language) => `${item.icon} ${item.name}`}
					rowTextForSelection={(item: Language) => `${item.icon} ${item.name}`}
					onSelect={onLanguageChange}
				/>
			</View>
			<View style={styles.settingsView}>
				<Text style={styles.settingsText}>{t("user.settings.theme")}</Text>
				<SelectDropdown
					data={[...interfaceSchemes]}
					defaultValue={interfaceSchemes.find((theme) => theme === userSettings?.interfaceTheme) ?? "auto"}
					buttonTextAfterSelection={(item: ThemeType) => t(`user.theme.${item}`)}
					rowTextForSelection={(item: ThemeType) => t(`user.theme.${item}`)}
					onSelect={onThemeChange}
				/>
			</View>
			<Button icon="restore" mode="contained-tonal" onPress={onSettingsReset} style={{ marginTop: 5 }}>
				{t("user.settings.reset")}
			</Button>
		</Card>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		marginBottom: 20,
	},
	settingsView: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	settingsText: {
		fontSize: 18,
		marginHorizontal: 10,
		width: 80,
	},
});

export default UserSettingsCard;
