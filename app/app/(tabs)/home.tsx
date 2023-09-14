import { useEffect } from "react";
import { ScrollView } from "react-native";
import i18next from "i18next";
import { useAtom } from "jotai";

import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import WorkPresenceCard from "@/components/home/WorkPresenceCard";
import CommunicationCard from "@/components/home/CommunicationCard";
import GeneralChatCard from "@/components/chat/GeneralChatCard";

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
		<ScrollView>
			<WorkPresenceCard />
			<CommunicationCard />
			<GeneralChatCard />
		</ScrollView>
	);
};

export default HomeScreen;
