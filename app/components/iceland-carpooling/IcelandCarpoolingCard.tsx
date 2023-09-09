import { Dimensions, StyleSheet, View } from "react-native";

import { Text, useThemeColor } from "@/components/Themed";
import { IcelandCarpoolingData } from "@/types/widgets/iceland-carpooling";

const { width } = Dimensions.get("window");

const IcelandCarpoolingCard = ({ item }: { item: IcelandCarpoolingData }) => {
	const borderColor = useThemeColor({}, "text");

	return (
		<View style={{ ...styles.view, borderColor }}>
			<Text style={styles.text}>From: {item.from}</Text>
			<Text style={styles.text}>To: {item.to}</Text>
			<Text style={styles.text}>Date: {item.date + " at " + item.time}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		margin: 20,
		borderWidth: 1,
		borderRadius: 15,
		overflow: "hidden",
	},
	text: {
		width: width,
		marginHorizontal: width * 0.03,
		marginVertical: width * 0.03,
		fontSize: 15,
		fontWeight: "bold",
		maxWidth: width * 0.45,
	},
});

export default IcelandCarpoolingCard;
