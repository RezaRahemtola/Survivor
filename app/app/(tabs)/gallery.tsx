import { FlatList, StyleSheet, ViewToken } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { View } from "@/components/Themed";
import GalleryCard from "@/components/gallery/GalleryCard";
import { BaseUserWithPicture } from "@/types/user";
import axios from "@/config/axios";
import { getAccessToken, getPicture } from "@/config/cache";

export default function GalleryScreen() {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState<BaseUserWithPicture[]>([]);

	useEffect(() => {
		(async () => {
			const accessToken = await getAccessToken();
			const response = await axios.get<BaseUserWithPicture[]>("/employees", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setUsers(response.data);
		})();
	}, []);

	const handleViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		const users: BaseUserWithPicture[] = viewableItems.map(({ item }) => item);
		users.forEach((user) => {
			if (user.picture) return;
			getPicture(user.id).then((picture) => (user.picture = picture));
		});
	}, []);

	return (
		<View style={styles.container}>
			<Searchbar
				style={styles.searchBar}
				placeholder="Search"
				onChangeText={(value) => setSearch(value)}
				value={search}
				editable
			/>
			<FlatList
				data={users}
				onViewableItemsChanged={handleViewableItemsChanged}
				keyExtractor={(user) => user.id.toString()}
				renderItem={({ item }) => <GalleryCard user={item} />}
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
