import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";

import { View } from "@/components/Themed";
import GalleryCard from "@/components/gallery/GalleryCard";
import { BaseUserWithPicture } from "@/types/user";
import axios from "@/config/axios";
import { useAuthContext } from "@/context/auth";

export default function GalleryScreen() {
	const [search, setSearch] = useState("");
	const { user } = useAuthContext();

	const [users, setUsers] = useState<BaseUserWithPicture[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get<BaseUserWithPicture[]>("/employees", {
				// data: { withPictures: "true" },
				headers: { Authorization: `Bearer ${user?.access_token}` },
			});
			setUsers(response.data);
		};

		fetchData();
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
			<ScrollView>
				{users.map((user) => (
					<GalleryCard key={user.id} {...user} />
				))}
			</ScrollView>
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
