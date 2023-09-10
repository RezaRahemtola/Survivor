import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { IcelandCarpoolingData, IcelandCarpoolingResponse } from "@/types/widgets/iceland-carpooling";
import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";
import IcelandCarpoolingCard from "@/components/iceland-carpooling/IcelandCarpoolingCard";

const IcelandCarpoolingTitle = () => {
	const { t } = useTranslation();

	return <Text style={styles.title}>{t("widgets.icelandCarpooling.title")}</Text>;
};

const IcelandCarpoolingLayout = () => {
	const [rides, setRides] = useState<IcelandCarpoolingData[]>([]);
	const { t } = useTranslation();

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get<IcelandCarpoolingResponse>("https://apis.is/rides/samferda-drivers/");
				setRides(response.data.results);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return rides ? (
		<>
			<IcelandCarpoolingTitle />
			<Slider
				items={rides}
				keyExtractor={(ride) => ride.link}
				renderItem={({ item }) => <IcelandCarpoolingCard item={item} />}
			/>
		</>
	) : (
		<>
			<IcelandCarpoolingTitle />
			<Text style={styles.loading}>{t("widgets.icelandCarpooling.loading")}</Text>
			<ActivityIndicator size="large" />
		</>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: "bold",
	},
	loading: {
		textAlign: "center",
		marginVertical: 5,
	},
});

export default IcelandCarpoolingLayout;
