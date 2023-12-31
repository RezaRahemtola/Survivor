import { FlatList, StyleSheet, ViewToken } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";

import { View } from "@/components/Themed";
import GalleryCard from "@/components/gallery/GalleryCard";
import { BaseUserWithPicture } from "@/types/user";
import axios from "@/config/axios";
import { getAccessToken } from "@/cache/accessToken";
import { getPicture } from "@/cache/pictures";

const GalleryScreen = () => {
	const [search, setSearch] = useState("");
	const [users, setUsers] = useState<BaseUserWithPicture[]>([]);
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<BaseUserWithPicture[]>("/employees", {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setUsers(response.data);
			} catch (error) {
				console.log(error);
			}
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
				placeholder={t("gallery.search")}
				onChangeText={(value) => setSearch(value)}
				value={search}
				editable
			/>
			<FlatList
				data={users.filter((user) => `${user.name} ${user.surname}`.toLowerCase().includes(search.toLowerCase()))}
				viewabilityConfig={{
					itemVisiblePercentThreshold: 1,
					minimumViewTime: 1,
				}}
				onViewableItemsChanged={handleViewableItemsChanged}
				keyExtractor={(user) => user.id.toString()}
				renderItem={({ item }) => <GalleryCard user={item} />}
			/>
		</View>
	);
};

export default GalleryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBar: {
		marginTop: 30,
	},
});
