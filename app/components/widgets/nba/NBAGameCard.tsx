import { Dimensions, StyleSheet, View } from "react-native";

import { Text, useThemeColor } from "@/components/Themed";
import { NBAGameResponse } from "@/types/widgets/nba";
import dayjs from "@/config/dayjs";
import ImageWithFallback from "@/components/ImageWithFallback";
import { styles as cardStyles } from "@/components/widgets/cardStyles";

const { width } = Dimensions.get("window");
const fallbackURI =
	"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png";

const NBAGameCard = ({ item }: { item: NBAGameResponse }) => {
	const borderColor = useThemeColor({}, "text");

	return (
		<View style={{ ...cardStyles.view, borderColor }}>
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
				<Text style={cardStyles.text}>{item.home_team_score}</Text>
				<Text style={cardStyles.text}>-</Text>
				<Text style={cardStyles.text}>{item.visitor_team_score}</Text>
			</View>
			<View style={styles.lineView}>
				<Text style={cardStyles.text}>{dayjs(item.date, "YYYY-MM-DD H:mm:ss").format("DD/MM/YYYY")}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
	},
	lineView: {
		flexDirection: "row",
		justifyContent: "center",
	},
});

export default NBAGameCard;
