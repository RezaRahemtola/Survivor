import { useAtom } from "jotai";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Card } from "react-native-elements";

import { userSettingsAtom } from "@/stores/widgets";
import { WorkPresence, workPresenceIcons, workPresences } from "@/types/settings";
import { Text, useThemeColor } from "@/components/Themed";
import { applyUserSettings } from "@/utils/settings";

const WorkPresenceCard = () => {
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
	const { t } = useTranslation();
	const backgroundColor = useThemeColor({}, "background");

	const onWorkPresenceChange = async (item: WorkPresence) => {
		const newSettings = { workPresence: item };
		await applyUserSettings(newSettings);
		setUserSettings((prev) => ({ ...prev!, ...newSettings }));
	};

	const getDisplayedLocation = (item: WorkPresence) => {
		const icon = workPresenceIcons[item];
		const text = t(`user.workPresence.${item}`);
		return `${icon} ${text}`;
	};

	return (
		<Card containerStyle={{ ...styles.container, backgroundColor }}>
			<Text style={styles.title}>{t("user.workPresence.title")}</Text>
			<SelectDropdown
				data={[...workPresences]}
				defaultValue={workPresences.find((presence) => presence === userSettings?.workPresence) ?? "office"}
				buttonTextAfterSelection={getDisplayedLocation}
				rowTextForSelection={getDisplayedLocation}
				onSelect={onWorkPresenceChange}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
	},
});
export default WorkPresenceCard;
