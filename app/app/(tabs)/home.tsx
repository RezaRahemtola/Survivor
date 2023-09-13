import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, TextInput } from "react-native";
import { getAccessToken } from "@/cache/accessToken";
import axios from "@/config/axios";
import { UserSettings } from "@/types/settings";
import i18next from "i18next";
import { atom, useAtom } from "jotai";
import Icon, { IconProps } from "@/components/Icon";
import { MessageSender } from "@/components/MessageSender";
import { editionWidgetsAtom, userSettingsAtom } from "@/stores/widgets";
import { router } from "expo-router";
import { io } from 'socket.io-client';
import { MessageReceiveAtom } from "@/stores/chat";


const receiveMessage = () => {

};

const HomeScreen = () => {
	const [, setUserSettings] = useAtom(userSettingsAtom);
	const [, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const [, setMessageReceived] = useAtom(MessageReceiveAtom)

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

	const socket = io('http://localhost:3000', {transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN1cmFvVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZOelFzSW1WdFlXbHNJam9pYjJ4cGRtVnlMbXhsZDJselFHMWhjM1Z5WVc4dWFuQWlMQ0p1WVcxbElqb2lUMnhwZG1WeUlpd2ljM1Z5Ym1GdFpTSTZJa3hsZDJseklpd2laWGh3SWpveE5qazJNelF3TkRrNWZRLnBtUFBEbG1mLW5JcGhWTmVaWlhXMG5OeURuMk43UXk4WUdWU1ZIY0ZnRG8iLCJlbWFpbCI6Im9saXZlci5sZXdpc0BtYXN1cmFvLmpwIiwiaWF0IjoxNjk0NTI2MDk5LCJleHAiOjE2OTUxMzA4OTl9.c_QG0YAL08HonDidyfWhLx5A1HVDnR2L0B8OqeIZxDc'
            }
        }
      }});

	socket.on('global-message', function({sender, message}) {
		console.log(`${sender} said: ${message}`);
		setMessageReceived(oldList => [...oldList, {message: message, email: sender}]);
	})

	return (
		<View style={styles.container}>
			<View style={[styles.tchatPreview, {borderWidth: 2, borderBottomColor: 'black'}]}>
				<View style={[styles.Header]}>
					<Text style={[styles.Title]}> Lastest Message </Text>
					<TouchableWithoutFeedback onPress={() => router.push("/home/modal")}>
						<Icon name="resize-full-screen" source="Entypo" size={25} style={{ alignSelf: 'center'}} />
					</TouchableWithoutFeedback>
				</View>
				<View style={[styles.HeaderMessageReceive]}>
					<Text> send by name</Text>
				</View>
				<View style={[styles.messageReceived]}>
					<Text> {"empty message"} </Text>
				</View>
				<MessageSender/>
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
		paddingBottom: 5,
		marginHorizontal: 10,
	},
	Title: {
		alignSelf: "center",
	},
	Messagesended: {
	},
	messageReceived: {
		backgroundColor: 'green',
		width: '50%',
		borderRadius: 10,
		paddingVertical: 10,
		paddingStart: 5
	},
	HeaderMessageSend: {
		marginLeft: 60,
		flexDirection: 'row',
	},
	HeaderMessageReceive: {
		marginLeft: 60,
		flexDirection: 'row',
	},
	Header: {
		flexDirection: 'row',
  		justifyContent: 'center',
		backgroundColor: 'transparent'
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
		paddingTop: 20,
	}
});

export default HomeScreen;
