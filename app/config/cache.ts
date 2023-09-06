import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "@/config/axios";
import { useAuthContext } from "@/context/auth";

const picturesCache = new Cache({
	namespace: "survivor",
	policy: {
		maxEntries: 50000,
		stdTTL: 60 * 10,
	},
	backend: AsyncStorage,
});

export const getPicture = async (userId: number): Promise<string | undefined> => {
	const cachedPicture = await picturesCache.get(userId.toString());
	if (cachedPicture) return cachedPicture;

	const { user: authUser } = useAuthContext();
	const fetchedPicture = await axios.get<string>(`/employees/${userId}/picture`, {
		headers: { Authorization: `Bearer ${authUser?.access_token}` },
	});
	picturesCache.set(userId.toString(), fetchedPicture.data);
	return fetchedPicture.data;
};

export default picturesCache;
