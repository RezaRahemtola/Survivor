import { Tabs } from "expo-router";
import { TouchableWithoutFeedback, useColorScheme } from "react-native";

import Colors from "@/constants/Colors";
import Icon, { IconProps } from "@/components/Icon";
import { signOut } from "@/config/auth";
import { useTranslation } from "react-i18next";

const TabBarIcon = (props: IconProps) => <Icon size={28} style={{ marginBottom: -3 }} {...props} />;

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
