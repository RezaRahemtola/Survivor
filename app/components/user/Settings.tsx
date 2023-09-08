import { Card } from "react-native-elements";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import SelectDropdown from "react-native-select-dropdown";
import { useAtom } from "jotai";

import { Text, useThemeColor } from "@/components/Themed";
import i18n from "@/config/i18n";
import axios from "@/config/axios";
import { getAccessToken } from "@/cache/accessToken";
import { userSettingsAtom } from "@/stores/widgets";
import { LanguageType } from "@/types/settings";

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

const UserSettings = () => {
	const { t } = useTranslation();
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);

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
		</Card>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		marginBottom: 20,
	},
});

export default UserSettings;
