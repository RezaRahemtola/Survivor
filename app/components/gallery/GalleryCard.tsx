import React from "react";
import { Card } from "react-native-elements";
import { Image, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from "../../components/Icon";
import { User } from "../../types/user";
import { router } from "expo-router";

type GalleryCardProps = Omit<User, "id">;
const GalleryCard = ({ email, name, surname, birth_date, gender, picture, work }: GalleryCardProps) => {
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={() =>
					router.push({
						pathname: "/user/modal",
						params: { email, name, surname, birth_date, gender, work, picture },
					})
				}
			>
				<Card>
					<View style={styles.headerColumn}>
						<Image style={styles.userImage} source={{ uri: `data:image/png;base64,${picture}` }} />
						<Text style={styles.userNameText}>
							{name} {surname}
						</Text>
						<View style={styles.userWorkRow}>
							<View>
								<Icon name="office-building" source="MaterialCommunityIcons" style={styles.workIcon} />
							</View>
							<View style={styles.userWorkContent}>
								<Text style={styles.userWorkText}>{work}</Text>
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
	userWorkRow: {
		alignItems: "center",
		flexDirection: "row",
	},
	userWorkContent: {
		backgroundColor: "transparent",
	},
	userWorkText: {
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
