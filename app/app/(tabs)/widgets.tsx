import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { View } from "@/components/Themed";
import { WidgetType } from "@/types/widgets";
import SelectDropdown from "react-native-select-dropdown";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { widgetsAtom } from "@/stores/widgets";

const widgets = [
	{ title: "Trending news", value: "trendingNews" },
	{ title: "Current weather", value: "currentWeather" },
	{ title: "Weather forecast", value: "weatherWeekForecast" },
];

const WidgetSelector = ({
	widget,
	onValueChange,
	onRemove,
}: {
	widget: WidgetType | undefined;
	onValueChange: (value: WidgetType) => void;
	onRemove: () => void;
}) => {
	return (
		<View style={{ flexDirection: "row" }}>
			<SelectDropdown
				data={widgets}
				buttonTextAfterSelection={(selectedItem) => selectedItem.title}
				rowTextForSelection={(item, index) => item.title}
				defaultValue={widget}
				onSelect={(item) => onValueChange(item.value)}
			/>
			<Button icon="delete" onPress={onRemove}>
				<></>
			</Button>
		</View>
	);
};

export default function WidgetsScreen() {
	const [, setWidgetsAtom] = useAtom(widgetsAtom);
	const [widgets, setWidgets] = useState<(WidgetType | undefined)[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<WidgetType[]>(`/widgets`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setWidgets(response.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	const saveWidgets = async () => {
		const accessToken = await getAccessToken();
		const newWidgets = widgets.filter((widget) => widget !== undefined) as WidgetType[];
		await axios.patch(
			"/widgets",
			{
				newWidgetNames: newWidgets,
			},
			{ headers: { Authorization: `Bearer ${accessToken}` } },
		);
		setWidgetsAtom(newWidgets);
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
				Add a widget
			</Button>
			<Button style={styles.save} buttonColor={"grey"} mode="contained" onPress={saveWidgets}>
				Save
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
