import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { NBAGameResponse } from "@/types/widgets/nba";
import { Text } from "@/components/Themed";
import Slider from "@/components/Slider";
import NBAGameCard from "@/components/widgets/nba/NBAGameCard";
import Icon from "@/components/Icon";

const NBARandomGamesTitle = () => {
	const { t } = useTranslation();

	return <Text style={styles.title}>{t("widgets.nbaGames.title")}</Text>;
};

const NBARandomGamesLayout = () => {
	const [games, setGames] = useState<NBAGameResponse[]>([]);
	const { t } = useTranslation();

	const fetchGames = async () => {
		try {
			setGames([]);
			const generateRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
			const gameIds = Array.from({ length: 5 }, () => generateRandomNumber(1, 46500));
			const fetchedGames = [];
			for (const game of gameIds) {
				const response = await axios.get<NBAGameResponse>(`https://www.balldontlie.io/api/v1/games/${game}`);
				fetchedGames.push(response.data);
			}
			setGames(fetchedGames);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchGames();
	}, []);

	return games.length > 0 ? (
		<>
			<View style={styles.lineView}>
				<NBARandomGamesTitle />
				<TouchableOpacity onPress={fetchGames}>
					<Icon name="reload1" source="AntDesign" size={22} />
				</TouchableOpacity>
			</View>
			<Slider
				items={games}
				keyExtractor={(game) => game.id.toString()}
				renderItem={({ item }) => <NBAGameCard item={item} />}
			/>
		</>
	) : (
		<>
			<NBARandomGamesTitle />
			<Text style={styles.loading}>{t("widgets.nbaGames.loading")}</Text>
			<ActivityIndicator size="large" />
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginRight: 10,
	},
	lineView: {
		flexDirection: "row",
	},
	loading: {
		textAlign: "center",
		marginVertical: 5,
	},
});

export default NBARandomGamesLayout;
