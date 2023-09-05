import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon, { IconProps } from "../Icon";

type ValueLineProps = {
	value: string;
	icon: IconProps;
};
const ValueLine = ({ value, icon }: ValueLineProps) => (
	<View style={styles.container}>
		<View style={styles.iconRow}>
			<Icon size={24} {...icon} />
		</View>
		<View style={styles.valueRow}>
			<View style={styles.valueColumn}>
				<Text style={styles.valueText}>{value}</Text>
			</View>
		</View>
	</View>
);

export default ValueLine;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: 25,
	},
	valueColumn: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: 5,
	},
	valueRow: {
		flex: 8,
		flexDirection: "column",
		justifyContent: "center",
	},
	valueText: {
		fontSize: 16,
	},
	iconRow: {
		flex: 2,
		justifyContent: "center",
	},
});
