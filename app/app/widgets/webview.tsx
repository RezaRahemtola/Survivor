import WebView from "react-native-webview";
import { useLocalSearchParams } from "expo-router";

type WebViewParams = {
	url: string;
};
const WebViewModal = () => {
	const { url } = useLocalSearchParams<WebViewParams>();

	return <WebView originWhitelist={["*"]} source={{ uri: url }} />;
};

export default WebViewModal;
