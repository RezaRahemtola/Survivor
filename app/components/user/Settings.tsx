import { Card } from "react-native-elements";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import SelectDropdown from "react-native-select-dropdown";
import { useAtom } from "jotai";
import { Button } from "react-native-paper";

import { Text, useThemeColor } from "@/components/Themed";
import i18n from "@/config/i18n";
import axios from "@/config/axios";
import { getAccessToken } from "@/cache/accessToken";
import { interfaceThemes, LanguageType, ThemeType, UserSettings } from "@/types/settings";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";


type Language = {
	icon: string;
	name: string;
	locale: LanguageType;
};
const languages: Language[] = [
	{ icon: "🇺🇸", name: "English", locale: "en" },
	{ icon: "🇫🇷", name: "Francais", locale: "fr" },
	{ icon: "🇪🇸", name: "Español", locale: "es" },
];

const UserSettingsCard = () => {
	const { t } = useTranslation();
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
	const [currentWidgets, setCurrentWidgets] = useAtom(editionWidgetsAtom);

	const onLanguageChange = async (item: Language) => {
		await i18n.changeLanguage(item.locale);
		const accessToken = await getAccessToken();
		await axios.patch(
			"/user-settings",
			{ language: item.locale },
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		setUserSettings({ ...userSettings!, language: item.locale });
	};

	const onThemeChange = async (item: ThemeType) => {
		const accessToken = await getAccessToken();
		await axios.patch(
			"/user-settings",
			{ interfaceTheme: item },
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		setUserSettings({ ...userSettings!, interfaceTheme: item });
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
			<Text style={styles.title}>{t("user.settings")}</Text>
			<SelectDropdown
				data={languages}
				defaultValue={languages.find((language) => language.locale === userSettings?.language)}
				buttonTextAfterSelection={(item: Language) => `${item.icon} ${item.name}`}
				rowTextForSelection={(item: Language) => `${item.icon} ${item.name}`}
				onSelect={onLanguageChange}
			/>
			<SelectDropdown
				data={[...interfaceThemes]}
				defaultValue={interfaceThemes.find((theme) => theme === userSettings?.interfaceTheme) ?? "auto"}
				buttonTextAfterSelection={(item: ThemeType) => t(`user.theme.${item}`)}
				rowTextForSelection={(item: ThemeType) => t(`user.theme.${item}`)}
				onSelect={onThemeChange}
			/>
			<Button mode="contained-tonal" onPress={onSettingsReset} style={{ marginTop: 5 }}>
				{t("user.reset")}
			</Button>
		</Card>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		marginBottom: 20,
	},
});

export default UserSettingsCard;
