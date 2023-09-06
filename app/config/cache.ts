import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "@/config/axios";

const picturesCache = new Cache({
	namespace: "survivor",
	policy: {
		maxEntries: 50000,
		stdTTL: 60 * 10,
	},
	backend: AsyncStorage,
});

export const getPicture = async (userId: number, accessToken: string | null): Promise<string | undefined> => {
	const cachedPicture = await picturesCache.get(userId.toString());
	if (cachedPicture) return cachedPicture;

	const fetchedPicture = await axios.get<string>(`/employees/${userId}/picture`, {
		headers: { Authorization: `Bearer ${accessToken}` },
	});
	picturesCache.set(userId.toString(), fetchedPicture.data);
	return fetchedPicture.data;
};

export default picturesCache;
