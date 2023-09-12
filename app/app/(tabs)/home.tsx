import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, TextInput } from "react-native";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";
import i18next from "i18next";
import { useAtom } from "jotai";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import Icon, { IconProps } from "@/components/Icon";
import { router } from "expo-router";

const HomeScreen = () => {
	const [, setUserSettings] = useAtom(userSettingsAtom);
	const [, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const [FirstLatestTchat, setFirstLatestTchat] = useState(String)
	const [FirstSecondLatest, setsetchat] = useState(String)
	const [NewMessage, setNewMessage] = useState(String);

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


	return (
		<View style={styles.container}>
			<View style={[styles.tchatPreview, {borderWidth: 2, borderBottomColor: 'black'}]}>
				<View style={[styles.Header]}>
					<Text style={[styles.Title]}> Lastest Message </Text>
					<TouchableWithoutFeedback onPress={() => router.push("/gallery")}>
						<Icon name="resize-full-screen" source="Entypo" size={25} style={{ alignSelf: 'center'}} />
					</TouchableWithoutFeedback>
				</View>
				{/* <View style={[styles.HeaderMessage]}>
					<Text> SEND BY ????</Text>
					<Text> AT HHHH </Text>
				</View>
				<View style={[styles.MessageView]}>
					<Text> {"empty messageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"} </Text>
				</View> */}
			<View style={styles.MessageSender}>
				<TextInput
					style={styles.MessageInput}
					placeholder="Type a new message"
					onChangeText={setNewMessage}
					value={NewMessage}/>
				<TouchableWithoutFeedback onPress={() => console.log("send Message")}>
						<Icon name="send" source="MaterialIcons" size={25} style={{ alignSelf: 'center', margin: 10}} />
				</TouchableWithoutFeedback>
			</View>
			</View>
		</View>);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tchatPreview: {
		marginTop: 20,
		borderRadius: 20,
		paddingBottom: 15,
		marginHorizontal: 10,
	},
	Title: {
		alignSelf: "center",
	},
	MessageView: {
		marginHorizontal: 10,
		flexDirection: 'row',
	},
	Header: {
		flexDirection: 'row',
  		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	HeaderMessage: {
		marginHorizontal: 10,
		flexDirection: 'row',
	},
	MessageInput: {
		borderWidth: 2,
		height: 50,
		paddingHorizontal: 10,
		borderRadius: 25,
		width: '85%',
	},
	MessageSender: {
		flexDirection: 'row',
		marginHorizontal: 10,
	}
});

export default HomeScreen;
