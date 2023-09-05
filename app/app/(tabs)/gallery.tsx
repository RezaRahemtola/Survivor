import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { useState } from "react";
import { Searchbar } from "react-native-paper";

export default function GalleryScreen() {
	const [search, setSearch] = useState("");

	return (
		<View style={styles.container}>
			<Searchbar
				style={styles.searchBar}
				placeholder="Search"
				onChangeText={(value) => setSearch(value)}
				value={search}
				editable
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBar: {
		marginTop: 30,
	},
});
