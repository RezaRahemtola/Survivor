import { useAtom } from "jotai";
import { Button, IconButton } from "react-native-paper";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import { editionWidgetsAtom, isWidgetsEditionModeAtom, userSettingsAtom } from "@/stores/widgets";
import { applyUserSettings } from "@/utils/settings";

export const WidgetEditionSaveButton = () => {
	const [isWidgetsEditionMode, setIsWidgetsEditionMode] = useAtom(isWidgetsEditionModeAtom);
	const [editionWidgets] = useAtom(editionWidgetsAtom);
	const [, setUserSettings] = useAtom(userSettingsAtom);

	return (
		<>
			{isWidgetsEditionMode ? (
				<IconButton
					icon="content-save"
					mode="contained"
					onPress={async () => {
						const settings = { widgets: editionWidgets };
						await applyUserSettings(settings);
						setUserSettings((prev) => ({ ...prev!, ...settings }));
						setIsWidgetsEditionMode(false);
					}}
				/>
			) : (
				<></>
			)}
		</>
	);
};

export const WidgetEditionAddButton = () => {
	const [isWidgetsEditionMode] = useAtom(isWidgetsEditionModeAtom);

	return (
		<>
			{isWidgetsEditionMode ? (
				<IconButton icon="plus" mode="contained" onPress={() => router.push("/widgets/add")} />
			) : (
				<></>
			)}
		</>
	);
};

export const WidgetEditionEditButton = () => {
	const [isEditionMode, setIsEditionMode] = useAtom(isWidgetsEditionModeAtom);
	const { t } = useTranslation();

	return (
		<Button disabled={isEditionMode} icon="pencil" mode="contained-tonal" onPress={() => setIsEditionMode(true)}>
			{t("widgets.edition.edit")}
		</Button>
	);
};
