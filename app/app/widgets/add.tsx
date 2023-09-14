import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useAtom } from "jotai";
import { router } from "expo-router";

import { widgetIcons, widgetTypes } from "@/types/widgets";
import { editionWidgetsAtom } from "@/stores/widgets";
import { Text } from "@/components/Themed";

const AddWidgetModal = () => {
	const { t } = useTranslation();
	const [currentWidgets, setCurrentWidgets] = useAtom(editionWidgetsAtom);
	const widgets = widgetTypes
		.filter((widgetType) => !currentWidgets.includes(widgetType))
		.map((widgetType) => ({
			title: t(`widgets.selector.${widgetType}`),
			value: widgetType,
			icon: widgetIcons[widgetType],
		}));

	return (
		<View style={styles.view}>
			<Text style={styles.title}>{t("widgets.edition.addTitle")}</Text>
			{widgets.length === 0 ? <Text style={styles.noWidgets}>{t("widgets.edition.noneAvailable")}</Text> : <></>}
			{widgets.map((widget) => (
				<Button
					key={widget.value}
					style={styles.button}
					mode="contained-tonal"
					onPress={() => {
						setCurrentWidgets((prev) => [...prev, widget.value]);
						router.back();
					}}
				>
					{widget.icon} {widget.title}
				</Button>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		alignItems: "center",
	},
	title: {
		fontSize: 25,
		marginVertical: 20,
	},
	noWidgets: {
		marginTop: 15,
		fontSize: 20,
	},
	button: {
		marginBottom: 10,
	},
});

export default AddWidgetModal;
