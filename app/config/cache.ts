import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "@/config/axios";

const cache = new Cache({
	namespace: "survivor",
	policy: {
		maxEntries: 50000,
		stdTTL: 60 * 10,
	},
	backend: AsyncStorage,
});

export const getPicture = async (userId: number): Promise<string | undefined> => {
	const cachedPicture = await cache.get(userId.toString());
	if (cachedPicture) return cachedPicture;

	const accessToken = await getAccessToken();
	const fetchedPicture = await axios.get<string>(`/employees/${userId}/picture`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	cache.set(userId.toString(), fetchedPicture.data);
	return fetchedPicture.data;
};

export const getAccessToken = () => {
	return cache.get("accessToken");
};

export const setAccessToken = async (accessToken: string) => {
	return cache.set("accessToken", accessToken);
};

export const removeAccessToken = async () => {
	return cache.remove("accessToken");
};

export default cache;
