import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const picturesCache = new Cache({
	namespace: "survivor-pictures",
	policy: {
		maxEntries: 50000,
		stdTTL: 60 * 60 * 24,
	},
	backend: AsyncStorage,
});

export const accessTokenCache = new Cache({
	namespace: "survivor-access-token",
	policy: {
		maxEntries: 1,
		stdTTL: 60 * 60 * 24 * 2,
	},
	backend: AsyncStorage,
});
