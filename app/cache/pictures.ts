import axios from "@/config/axios";
import { picturesCache } from "@/cache/cache";
import { getAccessToken } from "@/cache/accessToken";

export const getPicture = async (userId: number): Promise<string | undefined> => {
	try {
		const cachedPicture = await picturesCache.get(userId.toString());
		if (cachedPicture) return cachedPicture;

		const accessToken = await getAccessToken();
		const fetchedPicture = await axios.get<string>(`/employees/${userId}/picture`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		});
		picturesCache.set(userId.toString(), fetchedPicture.data);
		return fetchedPicture.data;
	} catch (error) {
		console.log(error);
	}
};
