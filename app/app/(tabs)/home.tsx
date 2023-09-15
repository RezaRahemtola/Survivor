import { useEffect } from "react";
import { ScrollView } from "react-native";
import i18next from "i18next";
import { useAtom } from "jotai";

import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";
import { editionWidgetsAtom, leadersAtom, userSettingsAtom } from "@/stores/widgets";
import WorkPresenceCard from "@/components/home/WorkPresenceCard";
import CommunicationCard from "@/components/home/CommunicationCard";
import MotdCard from "@/components/home/MotdCard";
import { LeaderUser } from "@/types/user";
import { isAxiosError } from "axios";
import GeneralChatCard from "@/components/chat/GeneralChatCard";

const HomeScreen = () => {
	const [, setUserSettings] = useAtom(userSettingsAtom);
	const [, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const [, setLeaders] = useAtom(leadersAtom);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = await getAccessToken();
				const { data: userSettingsData } = await axios.get<UserSettings>(`/user-settings`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setUserSettings(userSettingsData);
				setEditionWidgets(userSettingsData.widgets);
				await i18next.changeLanguage(userSettingsData.language);

				const { data: leaders } = await axios.get<LeaderUser[]>("/employees/leaders", {
					headers: { Authorization: `Bearer ${accessToken}` },
				});
				setLeaders(leaders);
			} catch (error) {
				if (isAxiosError(error)) console.log(error.response?.data);
				console.log(error);
			}
		})();
	}, []);

	return (
		<ScrollView>
			<MotdCard />
			<WorkPresenceCard />
			<CommunicationCard />
			<GeneralChatCard />
		</ScrollView>
	);
};

export default HomeScreen;
