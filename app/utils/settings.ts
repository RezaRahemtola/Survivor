import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";

export const applyUserSettings = async (settings: Partial<UserSettings>) => {
	const accessToken = await getAccessToken();
	await axios.patch("/user-settings", settings, { headers: { Authorization: `Bearer ${accessToken}` } });
};
