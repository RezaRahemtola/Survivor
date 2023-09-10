import { widgetTypes } from "@/types/widgets";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-paper";
import { useAtom } from "jotai";
import { editionWidgetsAtom } from "@/stores/widgets";
import { router } from "expo-router";

const AddWidgetModal = () => {
	const { t } = useTranslation();
	const [currentWidgets, setCurrentWidgets] = useAtom(editionWidgetsAtom);
	const widgets = widgetTypes
		.filter((widgetType) => !currentWidgets.includes(widgetType))
		.map((widgetType) => ({
			title: t(`widgets.selector.${widgetType}`),
			value: widgetType,
		}));

	return (
		<>
			{widgets.map((widget) => (
				<Button
					key={widget.value}
					mode="contained-tonal"
					onPress={() => {
						setCurrentWidgets((prev) => [...prev, widget.value]);
						router.back();
					}}
				>
					{widget.title}
				</Button>
			))}
		</>
	);
};

export default AddWidgetModal;
