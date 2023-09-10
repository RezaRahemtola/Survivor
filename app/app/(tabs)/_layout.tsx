import { router, Tabs } from "expo-router";
import { TouchableWithoutFeedback, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";

import Colors from "@/constants/Colors";
import Icon, { IconProps } from "@/components/Icon";
import { signOut } from "@/config/auth";
import { editionWidgetsAtom, isWidgetsEditionModeAtom, userSettingsAtom } from "@/stores/widgets";
import { IconButton } from "react-native-paper";
import { applyUserSettings } from "@/utils/settings";

const TabBarIcon = (props: IconProps) => <Icon size={28} style={{ marginBottom: -3 }} {...props} />;

const WidgetEditionSaveButton = () => {
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

const WidgetEditionAddButton = () => {
	const [isWidgetsEditionMode] = useAtom(isWidgetsEditionModeAtom);

	return (
		<>
			{isWidgetsEditionMode ? (
				<IconButton icon="plus" mode="contained" onPress={() => router.push("/widgets/modal")} />
			) : (
				<></>
			)}
		</>
	);
};

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { t } = useTranslation();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: t("tabs.home"),
					tabBarIcon: ({ color }) => <TabBarIcon name="home" source="FontAwesome" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="gallery"
				options={{
					title: t("tabs.gallery"),
					tabBarIcon: ({ color }) => <TabBarIcon name="picture" source="AntDesign" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="widgets"
				options={{
					title: t("tabs.widgets"),
					tabBarIcon: ({ color }) => <TabBarIcon name="widgets" source="MaterialIcons" color={color} />,
					headerRight: WidgetEditionSaveButton,
					headerLeft: WidgetEditionAddButton,
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: t("tabs.user"),
					tabBarIcon: ({ color }) => <TabBarIcon name="user" source="FontAwesome" color={color} />,
					headerRight: () => (
						<TouchableWithoutFeedback onPress={() => signOut()}>
							<Icon name="logout" source="MaterialIcons" size={25} style={{ marginRight: 15 }} />
						</TouchableWithoutFeedback>
					),
				}}
			/>
		</Tabs>
	);
}
