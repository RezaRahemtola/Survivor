import { useEffect } from "react";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";
import i18next, { changeLanguage } from "i18next";
import { atom, useAtom } from "jotai";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import WorkPresenceCard from "@/components/home/WorkPresenceCard";
import CommunicationCard from "@/components/home/CommunicationCard";
import ChatWidget from "@/components/home/ChatWidget";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen = () => {
	const [, setUserSettings] = useAtom(userSettingsAtom);
	const [, setEditionWidgets] = useAtom(editionWidgetsAtom);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const response = await axios.get<UserSettings>(`/user-settings`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setUserSettings(response.data);
				setEditionWidgets(response.data.widgets);
				await i18next.changeLanguage(response.data.language);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<>
			<ScrollView>
				<WorkPresenceCard />
				<CommunicationCard />
				<ChatWidget />
			</ScrollView>
		</>
	);
};

export default HomeScreen;
