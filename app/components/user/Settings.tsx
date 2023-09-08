import { Card } from "react-native-elements";
import { Text, useThemeColor } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import SelectDropdown from "react-native-select-dropdown";
import i18n from "@/config/i18n";

const languages = [
	{ icon: "🇺🇸", name: "English", locale: "en" },
	{ icon: "🇫🇷", name: "Francais", locale: "fr" },
];

const UserSettings = () => {
	const { t } = useTranslation();

	return (
		<Card containerStyle={{ backgroundColor: useThemeColor({}, "background") }}>
			<Text style={styles.title}>{t("user.settings")}</Text>
			<SelectDropdown
				data={languages}
				buttonTextAfterSelection={(item) => `${item.icon} ${item.name}`}
				rowTextForSelection={(item, index) => `${item.icon} ${item.name}`}
				onSelect={(item) => i18n.changeLanguage(item.locale)}
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
