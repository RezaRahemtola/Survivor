import React from "react";
import { Card } from "react-native-elements";
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAuthContext } from "../../context/auth";
import ValueLine from "../../components/user/ValueLine";
import Icon from "../../components/Icon";
import { User } from "../../types/user";

type HeadComponentProps = {
	name: string;
	surname: string;
	work: string;
};
const HeadComponent = ({ name, surname, work }: HeadComponentProps) => {
	const avatar = "https://i.imgur.com/GfkNpVG.jpg";
	const avatarBackground = "https://i.imgur.com/rXVcgTZ.jpg";

	return (
		<View>
			<ImageBackground style={styles.headerBackgroundImage} blurRadius={10} source={{ uri: avatarBackground }}>
				<View style={styles.headerColumn}>
					<Image style={styles.userImage} source={{ uri: avatar }} />
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
			</ImageBackground>
		</View>
	);
};

type UserScreenProps = Omit<User, "id" | "subordinates" | "access_token">;
const UserScreen = () => {
	const { user } = useAuthContext();
	const { email, name, surname, birth_date, gender, work } = user!;

	return (
		<ScrollView style={styles.scroll}>
			<View style={styles.container}>
				<Card>
					<HeadComponent name={name} surname={surname} work={work} />
					<ValueLine value={email} icon={{ name: "email", source: "MaterialIcons" }} />
					<ValueLine
						value={gender}
						icon={{ source: "MaterialCommunityIcons", name: gender === "Male" ? "gender-male" : "gender-female" }}
					/>
					<ValueLine value={birth_date} icon={{ source: "FontAwesome", name: "birthday-cake" }} />
				</Card>
			</View>
		</ScrollView>
	);
};

export default UserScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerBackgroundImage: {
		paddingBottom: 20,
		paddingTop: 45,
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
		color: "white",
		fontSize: 26,
	},
	scroll: {
		backgroundColor: "#FFF",
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
		borderColor: "#FFF",
		borderRadius: 85,
		borderWidth: 3,
		height: 170,
		marginBottom: 15,
		width: 170,
	},
	userNameText: {
		color: "#FFF",
		fontSize: 22,
		fontWeight: "bold",
		paddingBottom: 8,
		textAlign: "center",
	},
});
