import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
export const styles = StyleSheet.create({
	view: {
		margin: 20,
		marginLeft: 0,
		borderWidth: 1,
		borderRadius: 15,
		overflow: "hidden",
	},
	text: {
		marginHorizontal: width * 0.03,
		marginVertical: width * 0.03,
		fontSize: 15,
		fontWeight: "bold",
		maxWidth: width * 0.45,
	},
});
