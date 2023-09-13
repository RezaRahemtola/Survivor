import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from "react-native";
import Icon, { IconProps } from "@/components/Icon";
import { io } from 'socket.io-client';
import { useAtom } from "jotai";
import { MessageReceiveAtom } from "@/stores/chat";

export const MessageSender = () => {

    const [message, setMessage] = useState(String);
    const [, setMessageReceived] = useAtom(MessageReceiveAtom)

    const socket = io('http://localhost:3000', {transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXN1cmFvVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZOelFzSW1WdFlXbHNJam9pYjJ4cGRtVnlMbXhsZDJselFHMWhjM1Z5WVc4dWFuQWlMQ0p1WVcxbElqb2lUMnhwZG1WeUlpd2ljM1Z5Ym1GdFpTSTZJa3hsZDJseklpd2laWGh3SWpveE5qazJNelF3TkRrNWZRLnBtUFBEbG1mLW5JcGhWTmVaWlhXMG5OeURuMk43UXk4WUdWU1ZIY0ZnRG8iLCJlbWFpbCI6Im9saXZlci5sZXdpc0BtYXN1cmFvLmpwIiwiaWF0IjoxNjk0NTI2MDk5LCJleHAiOjE2OTUxMzA4OTl9.c_QG0YAL08HonDidyfWhLx5A1HVDnR2L0B8OqeIZxDc'
            }
        }
      }});

    const sendMessage = (message: string) => socket.emit('global-message', {message: `${message} (${socket.id})`})

    setMessageReceived(oldList => [...oldList, {message: message, email: "Me"}]);

    return (
        <View style={{ flexDirection: "row",}}>
            <TextInput
                style={styles.textInput}
                placeholder="Send a message"
                placeholderTextColor={"white"}
                onChangeText={setMessage}
                value={message}
            />
            <TouchableWithoutFeedback onPress={() => {sendMessage(message)}}>
                <Icon name="send" source="MaterialIcons" size={25} style={{ alignSelf: 'center', marginRight: 15, flex: 2}} color="black" />
            </TouchableWithoutFeedback>
        </View>
    )
};

const styles = StyleSheet.create({
    textInput: {
        margin: 10,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 30,
        backgroundColor: '#000000',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        color: "#FFFFFF",
        flex: 8,
    },
    text: {
        color: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
    },
});
