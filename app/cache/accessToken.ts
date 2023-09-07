import { accessTokenCache } from "@/cache/cache";

export const getAccessToken = () => {
	return accessTokenCache.get("accessToken");
};

export const setAccessToken = async (accessToken: string) => {
	return accessTokenCache.set("accessToken", accessToken);
};

export const removeAccessToken = async () => {
	return accessTokenCache.remove("accessToken");
};
