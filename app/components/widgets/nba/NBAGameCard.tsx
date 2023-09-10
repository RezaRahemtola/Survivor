import { Dimensions, StyleSheet, View } from "react-native";

import { Text, useThemeColor } from "@/components/Themed";
import { NBAGameResponse } from "@/types/widgets/nba";
import dayjs from "@/config/dayjs";
import ImageWithFallback from "@/components/ImageWithFallback";

const { width } = Dimensions.get("window");
const fallbackURI =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png";

const NBAGameCard = ({ item }: { item: NBAGameResponse }) => {
	const borderColor = useThemeColor({}, "text");

	return (
		<View style={{ ...styles.view, borderColor }}>
			<View style={styles.lineView}>
				<ImageWithFallback
					source={{
						uri: `https://loodibee.com/wp-content/uploads/nba-${item.home_team.full_name
							.toLocaleLowerCase()
							.replace(" ", "-")}-logo.png`,
					}}
					style={styles.image}
					fallback={{ uri: fallbackURI }}
				/>
				<ImageWithFallback
					source={{
						uri: `https://loodibee.com/wp-content/uploads/nba-${item.visitor_team.full_name
							.toLocaleLowerCase()
							.replace(" ", "-")}-logo.png`,
					}}
					style={styles.image}
					fallback={{ uri: fallbackURI }}
				/>
			</View>
			<View style={styles.lineView}>
				<Text style={styles.text}>{item.home_team_score}</Text>
				<Text style={styles.text}>-</Text>
				<Text style={styles.text}>{item.visitor_team_score}</Text>
			</View>
			<View style={styles.lineView}>
				<Text style={styles.text}>{dayjs(item.date, "YYYY-MM-DD H:mm:ss").format("DD/MM/YYYY")}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
	},
	view: {
		margin: 20,
		marginLeft: 0,
		borderWidth: 1,
		borderRadius: 15,
		overflow: "hidden",
	},
	lineView: {
		flexDirection: "row",
		justifyContent: "center",
	},
	text: {
		marginHorizontal: width * 0.03,
		marginVertical: width * 0.03,
		fontSize: 15,
		fontWeight: "bold",
		maxWidth: width * 0.45,
	},
});

export default NBAGameCard;
