import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "@/constants/Colors";
import Icon, { IconProps } from "@/components/Icon";

const TabBarIcon = (props: IconProps) => <Icon size={28} style={{ marginBottom: -3 }} {...props} />;

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => <TabBarIcon name="home" source="FontAwesome" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="gallery"
				options={{
					title: "Gallery",
					tabBarIcon: ({ color }) => <TabBarIcon name="picture" source="AntDesign" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="widgets"
				options={{
					title: "Widgets",
					tabBarIcon: ({ color }) => <TabBarIcon name="widgets" source="MaterialIcons" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: "User",
					tabBarIcon: ({ color }) => <TabBarIcon name="user" source="FontAwesome" color={color} />,
				}}
			/>
		</Tabs>
	);
}
