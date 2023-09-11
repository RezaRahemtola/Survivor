import { Card } from "react-native-elements";
import { Image, ImageBackground, Platform, StyleSheet, Text, View } from "react-native";

import ValueLine from "@/components/user/ValueLine";
import Icon from "@/components/Icon";
import { ModalUser } from "@/types/user";
import { useThemeColor } from "@/components/Themed";
import { useTranslation } from "react-i18next";
import dayjs from "@/config/dayjs";

type HeadComponentProps = {
	name: string;
	surname: string;
	work: string;
	picture: string;
};
const HeadComponent = ({ name, surname, work, picture }: HeadComponentProps) => (
	<View style={styles.headComponent}>
		<ImageBackground
			style={styles.headerBackgroundImage}
			blurRadius={10}
			source={{ uri: "https://i.imgur.com/rXVcgTZ.jpg" }}
		>
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
		</ImageBackground>
	</View>
);

const UserLayout = ({ user }: { user: ModalUser }) => {
	const { t } = useTranslation();
	return (
		<View style={{ ...styles.container, backgroundColor: useThemeColor({}, "background") }}>
			<Card containerStyle={{ backgroundColor: useThemeColor({}, "background") }}>
				<HeadComponent name={user.name} surname={user.surname} work={user.work} picture={user.picture!} />
				<ValueLine value={user.email} icon={{ name: "email", source: "MaterialIcons" }} />
				<ValueLine
					value={t(`user.gender.${user.gender.toLowerCase()}`)}
					icon={{ source: "MaterialCommunityIcons", name: user.gender === "Male" ? "gender-male" : "gender-female" }}
				/>
				<ValueLine value={dayjs(user.birth_date, "YYYY-MM-DD").format("DD/MM/YYYY")} icon={{ source: "FontAwesome", name: "birthday-cake" }} />
			</Card>
		</View>
	);
};

export default UserLayout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headComponent: {
		paddingBottom: 30,
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
