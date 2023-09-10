import { Dimensions, Image, Share, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

import { Text } from "@/components/Themed";
import Icon from "@/components/Icon";
import { TrendingNewsArticle } from "@/types/widgets/news";

const { width } = Dimensions.get("window");

const TopNewsCard = ({ item }: { item: TrendingNewsArticle }) => {
	const handleShare = () => {
		const { url, title } = item;
		const message = `${title} \n\n Read more at ${url}`;
		return Share.share({ title, message, url: url }, { dialogTitle: `Share ${title}` });
	};
	const { t } = useTranslation();

	return (
		<View
			style={{
				margin: 20,
				marginLeft: 0,
				borderRadius: 15,
				width: 200,
				height: 200,
				overflow: "hidden",
				elevation: 3,
			}}
		>
			<Image source={{ uri: item.urlToImage! }} style={styles.image} />
			<Text
				style={{
					width: width,
					marginHorizontal: width * 0.03,
					marginVertical: width * 0.03,
					fontSize: 15,
					fontWeight: "bold",
					maxWidth: width * 0.45,
				}}
				numberOfLines={2}
			>
				{item.title ?? t("widgets.notAvailable")}
			</Text>
			<Text style={styles.author}> {item.author ?? t("widgets.news.notAvailable")}</Text>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View
					style={{
						borderRadius: 15,
						justifyContent: "center",
						alignItems: "center",
						width: 130,
						padding: 2,
						elevation: 3,
						marginLeft: 10,
						marginTop: 5,
					}}
				>
					<Text
						style={{
							fontSize: 10,
						}}
					>
						{item.publishedAt ? `🕘 ${item.publishedAt}` : ""}
					</Text>
				</View>
				<TouchableOpacity
					style={{
						justifyContent: "center",
						marginRight: 10,
					}}
					onPress={handleShare}
				>
					<Icon name="sharealt" source="AntDesign" size={20} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 100,
	},
	author: {
		width: width,
		marginTop: -10,
		marginHorizontal: width * 0.03,
		color: "darkgray",
		maxWidth: width * 0.4,
	},
});

export default TopNewsCard;
