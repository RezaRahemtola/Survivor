import { Cache } from "react-native-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cache = new Cache({
	namespace: "survivor",
	policy: {
		maxEntries: 50000, // if unspecified, it can have unlimited entries
		stdTTL: 60 * 10, // the standard ttl as number in seconds, default: 0 (unlimited)
	},
	backend: AsyncStorage,
});

export default cache;
