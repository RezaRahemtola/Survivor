import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import { useAtom } from "jotai";

import { View } from "@/components/Themed";
import { WidgetType, widgetTypes } from "@/types/widgets";
import SelectDropdown from "react-native-select-dropdown";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { userSettingsAtom } from "@/stores/widgets";
import { useTranslation } from "react-i18next";

const WidgetSelector = ({
	widget,
	onValueChange,
	onRemove,
}: {
	widget: WidgetType | undefined;
	onValueChange: (value: WidgetType) => void;
	onRemove: () => void;
}) => {
	const { t } = useTranslation();
	const widgets = widgetTypes.map((widgetType) => ({
		title: t(`widgets.selector.${widgetType}`),
		value: widgetType,
	}));

	return (
		<View style={{ flexDirection: "row" }}>
			<SelectDropdown
				data={widgets}
				buttonTextAfterSelection={(selectedItem) => selectedItem.title}
				rowTextForSelection={(item, index) => item.title}
				defaultValue={widgets.find((item) => item.value === widget)}
				onSelect={(item) => onValueChange(item.value)}
			/>
			<Button icon="delete" onPress={onRemove}>
				<></>
			</Button>
		</View>
	);
};

export default function WidgetsScreen() {
	const [userSettings, setUserSettings] = useAtom(userSettingsAtom);
	const [widgets, setWidgets] = useState<(WidgetType | undefined)[]>(userSettings?.widgets ?? []);
	const { t } = useTranslation();

	const saveWidgets = async () => {
		const accessToken = await getAccessToken();
		const newWidgets = widgets.filter((widget) => widget !== undefined) as WidgetType[];
		await axios.patch(
			"/user-settings",
			{
				widgets: newWidgets,
			},
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		setUserSettings({ ...userSettings!, widgets: newWidgets });
	};

	return (
		<View style={styles.container}>
			{widgets.map((widget, index) => (
				<WidgetSelector
					key={index}
					widget={widget}
					onValueChange={(value: WidgetType) => {
						const dupWidgets = [...widgets];
						dupWidgets.splice(index, 1, value);
						setWidgets(dupWidgets);
					}}
					onRemove={() => {
						const dupWidgets = [...widgets];
						dupWidgets.splice(index - 1, 1);
						setWidgets(dupWidgets);
					}}
				/>
			))}
			<Button style={styles.addWidget} icon="plus" mode="contained" onPress={() => setWidgets([...widgets, undefined])}>
				{t("widgets.actions.add")}
			</Button>
			<Button style={styles.save} buttonColor={"grey"} mode="contained" onPress={saveWidgets}>
				{t("widgets.actions.save")}
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	addWidget: {
		marginTop: 15,
	},
	save: {
		marginTop: 5,
	},
});
