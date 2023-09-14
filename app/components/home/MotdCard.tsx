import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput } from "react-native";
import { Card } from "react-native-elements";
import { Text, useThemeColor } from "@/components/Themed";
import { useEffect, useState } from "react";
import axios from "@/config/axios";
import { getAccessToken } from "@/cache/accessToken";
import { leadersAtom, userSettingsAtom } from "@/stores/widgets";
import { useAtom } from "jotai";
import { isAxiosError } from "axios";

const MotdCard = () => {
	const [motd, setMotd] = useState<string | undefined>("Loading...");
	const [leaders] = useAtom(leadersAtom);
	const [settings] = useAtom(userSettingsAtom);
	const { t } = useTranslation();
	const backgroundColor = useThemeColor({}, "background");
	const isLeader = leaders.some((leader) => leader.email === settings?.email);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const {
					data: { motd },
				} = await axios.get<{ motd: string }>("/motd", {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setMotd(motd);
			} catch (error) {
				if (isAxiosError(error) && error.response?.status === 404) {
					setMotd("");
				} else {
					console.log(error);
				}
			}
		})();
	}, []);

	const onLeaderSubmitMotd = async () => {
		console.log("onLeaderSubmitMotd", motd);
		try {
			const accessToken = await getAccessToken();
			await axios.patch(
				"/motd",
				{ motd },
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				},
			);
		} catch (error) {
			console.log("error");
			console.log(error);
		}
	};

	return (
		<Card containerStyle={{ ...styles.container, backgroundColor }}>
			<Text style={styles.title}>{t("user.motd.title")}</Text>
			<TextInput
				editable={isLeader}
				selectTextOnFocus={isLeader}
				value={motd}
				placeholder={t("user.motd.placeholder")}
				onChangeText={setMotd}
				onSubmitEditing={onLeaderSubmitMotd}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		paddingBottom: 10,
	},
});
export default MotdCard;
