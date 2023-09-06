import { Image, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Card } from "react-native-elements";

import Icon from "@/components/Icon";
import { BaseUserWithPicture } from "@/types/user";


const GalleryCard = ({ email, name, surname, picture }: BaseUserWithPicture) => {
	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback
				onPress={
					() => {}
					// router.push({
					// 	pathname: "/user/modal",
					// 	params: { email, name, surname, birth_date, gender, work, picture },
					// })
				}
			>
				<Card>
					<View style={styles.headerColumn}>
						<Image style={styles.userImage} source={{ uri: `data:image/png;base64,${picture}` }} />
						<Text style={styles.userNameText}>
							{name} {surname}
						</Text>
						<View style={styles.userEmailRow}>
							<View>
								<Icon name="email" source="MaterialIcons" style={styles.workIcon} />
							</View>
							<View style={styles.userEmailContent}>
								<Text style={styles.userEmailText}>{email}</Text>
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
