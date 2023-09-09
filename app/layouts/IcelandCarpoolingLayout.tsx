import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import { ActivityIndicator } from "react-native-paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { IcelandCarpoolingData, IcelandCarpoolingResponse } from "@/types/widgets/iceland-carpooling";
import IcelandCarpoolingSlider from "@/components/iceland-carpooling/IcelandCarpoolingSlider";

const IcelandCarpoolingTitle = () => <Text style={styles.title}>Next Iceland carpooling rides</Text>;

const IcelandCarpoolingLayout = () => {
	const [rides, setRides] = useState<IcelandCarpoolingData[]>([]);

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
			<IcelandCarpoolingSlider rides={rides} />
		</>
	) : (
		<>
			<IcelandCarpoolingTitle />
			<Text style={styles.loading}>Iceland carpooling rides loading...</Text>
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
