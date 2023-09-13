import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback, useColorScheme } from "react-native";
import { io } from 'socket.io-client';

import { useAtom } from "jotai";
import { MessageReceiveAtom } from "@/stores/chat";
import { getAccessToken } from "@/cache/accessToken";
import { Icon } from "react-native-elements";

export const MessageSender = () => {

    const [message, setMessage] = useState(String);
    const [, setMessageReceived] = useAtom(MessageReceiveAtom)
    const [token, setToken] = useState<string | undefined>();

    useEffect(() => {
        const createSocket = async () => {
            const tkn = await getAccessToken();
            setToken(tkn);
        };
        createSocket();
    }, []);

    const socket = io(`${process.env.EXPO_PUBLIC_API_URL}`, {transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${token}`,
            }
        }
    }});
    socket.on('connect', function() {
        console.log('Connectedsender');
    });
    const sendMessage = (message: string) => {
        socket.emit('global-message', {message: `${message} (${socket.id})`});
        setMessageReceived(oldList => [...oldList, {message: message, email: "Me"}]);
        setMessage("");
    }
    socket.on('events', function(data) {
        console.log('event', data);
    });
    socket.on('exception', function(data) {
        console.error('exception', data);
    });
    socket.on('disconnect', function() {
        console.warn('Disconnected');
    });

    const colorScheme = useColorScheme();
    const { t } = useTranslation();

    return (
        <View style={{ flexDirection: "row" }}>
            <TextInput
                style={ colorScheme === "dark" ? styles.textInputWhite : styles.textInputBlack }
                placeholder={t("chat.sendMessage")}
                placeholderTextColor={colorScheme === "dark" ? "white" : "black"}
                onChangeText={setMessage}
                value={message}
            />
            <TouchableWithoutFeedback onPress={() => {if (message) sendMessage(message)}}>
                <Icon name="send" source="MaterialIcons" size={25} style={styles.icon} color={ colorScheme === "dark" ? "#FFFFFF" : "#000000" } />
            </TouchableWithoutFeedback>
        </View>
    )
};

const styles = StyleSheet.create({
    textInputWhite: {
        margin: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        backgroundColor: "transparent",
        borderColor: '#FFFFFF',
        borderWidth: 1,
        color: "#FFFFFF",
        flex: 8,
    },
    textInputBlack: {
        margin: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        backgroundColor: "transparent",
        borderColor: '#000000',
        borderWidth: 1,
        color: "#000000",
        flex: 8,
    },
    icon: {
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 25,
        flex: 2
    }
});
