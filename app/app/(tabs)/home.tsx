import { Text } from "@/components/Themed";
import { useEffect } from "react";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";
import i18next from "i18next";
import { useAtom } from "jotai";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";

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

	return <Text>Blank home screen</Text>;
};

export default HomeScreen;
