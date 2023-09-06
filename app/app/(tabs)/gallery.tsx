import { FlatList, StyleSheet, ViewToken } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { View } from "@/components/Themed";
import GalleryCard from "@/components/gallery/GalleryCard";
import { BaseUserWithPicture } from "@/types/user";
import axios from "@/config/axios";
import { useAuthContext } from "@/context/auth";

export default function GalleryScreen() {
	const [search, setSearch] = useState("");
	const { user: authUser } = useAuthContext();
	const accessToken = authUser!.access_token;

	const [users, setUsers] = useState<BaseUserWithPicture[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<BaseUserWithPicture[]>("/employees", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setUsers(response.data);
		};

		fetchData();
	}, []);

	const handleViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
		const users: BaseUserWithPicture[] = viewableItems.map(({ item }) => item);
		users.forEach((user) => {
			if (user.picture) return;
			axios
				.get(`/employees/${user.id}/picture`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				})
				.then((response) => {
					user.picture = response.data;
				});
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
				renderItem={({ item }) => <GalleryCard {...item} />}
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
