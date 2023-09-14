import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, useColorScheme } from "react-native";
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
import { color } from "react-native-elements/dist/helpers";
import { MessageReceiveData } from "@/types/chat";


const latestMessage = (message: MessageReceiveData[]) => {
	const colorScheme = useColorScheme();
	if (message.length === 0) {
		return (
			<Text style={styles.NoMessage} >No Message</Text>
		);
	}
	if (message.length === 1) {
		return (
			<View>
				<View style={[styles.HeaderMessageReceive, message.at(-1)?.email === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }]}>
					<Text style={[styles.TextMessage]}> {message.at(-1)?.email}</Text>
				</View>
				<View style={message.at(-1)?.email === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }}>
				<View style={[styles.messageReceived, {backgroundColor: colorScheme === "dark" ? "#FFFFFF" : "#000000"}]}>
					<Text style={{color: colorScheme === "dark" ? "#000000" : "#FFFFFF"}}> {message.at(-1)?.message} </Text>
				</View>
				</View>
			</View>
		);
	}
	if (message.length > 1) {
		return (
			<View>
				<View style={[styles.HeaderMessageReceive, message.at(-2)?.email === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }]}>
					<Text style={[styles.TextMessage]}> {message.at(-2)?.email}</Text>
				</View>
				<View style={message.at(-2)?.email === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }}>
				<View style={[styles.messageReceived, {backgroundColor: colorScheme === "dark" ? "#FFFFFF" : "#000000"}]}>
					<Text style={{color: colorScheme === "dark" ? "#000000" : "#FFFFFF"}}> {message.at(-2)?.message} </Text>
				</View>
				</View>
				<View style={[styles.HeaderMessageReceive, message.at(-1)?.email === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }]}>
					<Text style={[styles.TextMessage]}> {message.at(-1)?.email}</Text>
				</View>
				<View style={message.at(-1)?.email === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }}>
				<View style={[styles.messageReceived, {backgroundColor: colorScheme === "dark" ? "#FFFFFF" : "#000000"}]}>
					<Text style={{color: colorScheme === "dark" ? "#000000" : "#FFFFFF"}}> {message.at(-1)?.message} </Text>
				</View>
				</View>
			</View>
		);
	}
};

const HomeScreen = () => {
	const [, setUserSettings] = useAtom(userSettingsAtom);
	const [, setEditionWidgets] = useAtom(editionWidgetsAtom);
	const [, setMessageReceived] = useAtom(MessageReceiveAtom)
	const colorScheme = useColorScheme();
	const [messages,] = useAtom(MessageReceiveAtom);
	const [Token, setToken] = useState<String | undefined>();
	const [Socket, setSocket] = useState(io())

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

	useEffect (() => {
		const createSocket = async () => {
            const tkn = await getAccessToken();
            setToken(tkn);
        };
		const socket = io(`${process.env.EXPO_PUBLIC_API_URL}`, {transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${Token}`
            }
        }
      }});
	  setSocket(socket);
	}, []);
	Socket.on('connect', function() {
        console.log('ConnectedReceiver');
    });

	Socket.on('global-message', function({sender, message}) {
		console.log(`${sender} said: ${message}`);
		setMessageReceived(oldList => [...oldList, {message: message, email: sender}]);
	})

	Socket.on('events', function(data) {
        console.log('Revent', data);
    });
    Socket.on('exception', function(data) {
        console.error('Rexception', data);
    });
    Socket.on('disconnect', function() {
        console.warn('RDisconnected');
    });

	return (
		<View style={styles.container}>
			<View style={[styles.tchatPreview, {borderWidth: 2, borderColor: colorScheme === "dark" ? "#FFFFFF" : "#000000"}]}>
				<View style={[styles.Header]}>
					<Text style={[styles.Title]}> Latest Message </Text>
					<TouchableWithoutFeedback onPress={() => router.push("/home/modal")}>
						<Icon name="resize-full-screen" source="Entypo" size={25} style={{ alignSelf: 'center'}} />
					</TouchableWithoutFeedback>
				</View>
				{latestMessage(messages)}
				<MessageSender/>
			</View>
		</View>
		);
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
	messageReceived: {
		maxWidth: "50%",
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 25,
        margin: 10,
        marginTop: 3,
	},
	HeaderMessageReceive: {
		marginLeft: 10
	},
	TextMessage: {
		marginRight: 20,
		marginLeft: 20,
		fontSize: 12
	},
	HeaderMessageSend: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		margin: 5,
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
	},
	NoMessage: {
		fontSize: 40,
		alignSelf: 'center',
	}
});

export default HomeScreen;
