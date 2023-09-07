import { Image, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Card } from "react-native-elements";

import Icon from "@/components/Icon";
import { FullUser, isFullUser, User } from "@/types/user";
import { router } from "expo-router";
import axios from "@/config/axios";
import { getAccessToken } from "@/config/cache";

const GalleryCard = ({ user }: { user: User }) => {
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={async () => {
					if (isFullUser(user)) {
						router.push({
							pathname: "/user/modal",
							params: { ...user },
						});
					}
					const accessToken = await getAccessToken();
					const response = await axios.get<FullUser>(`/employees/${user.id}`, {
						headers: { Authorization: `Bearer ${accessToken}` },
					});

					router.push({
						pathname: "/user/modal",
						params: { ...response.data, picture: user.picture! },
					});
				}}
			>
				<Card>
					<View style={styles.headerColumn}>
						<Image style={styles.userImage} source={{ uri: `data:image/png;base64,${user.picture}` }} />
						<Text style={styles.userNameText}>
							{user.name} {user.surname}
						</Text>
						<View style={styles.userEmailRow}>
							<View>
								<Icon name="email" source="MaterialIcons" style={styles.workIcon} />
							</View>
							<View style={styles.userEmailContent}>
								<Text style={styles.userEmailText}>{user.email}</Text>
							</View>
						</View>
					</View>
				</Card>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default GalleryCard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 30,
	},
	headerColumn: {
		backgroundColor: "transparent",
		...Platform.select({
			ios: {
				alignItems: "center",
				elevation: 1,
				marginTop: -1,
			},
			android: {
				alignItems: "center",
			},
		}),
	},
	workIcon: {
		color: "black",
		fontSize: 26,
	},
	userEmailRow: {
		alignItems: "center",
		flexDirection: "row",
	},
	userEmailContent: {
		backgroundColor: "transparent",
	},
	userEmailText: {
		color: "#A5A5A5",
		fontSize: 15,
		fontWeight: "600",
		textAlign: "center",
	},
	userImage: {
		borderColor: "#666",
		borderRadius: 85,
		borderWidth: 3,
		height: 170,
		marginBottom: 15,
		width: 170,
	},
	userNameText: {
		color: "#A5A5A5",
		fontSize: 22,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "center",
	},
});
