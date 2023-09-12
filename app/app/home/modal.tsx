import { MessageSender } from "@/components/MessageSender";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";

type Message = {
    message: string,
};

let messages: Message[] = [
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
    {
        message: "Test",
    },
    {
        message: "AJIUHHJ",
    },
];

const ChatModal = () => {
    return (
        <View style={styles.view}>
            <FlatList inverted data={[...messages].reverse()} renderItem={({item}) => <Text style={styles.text}>{item.message}</Text>} />
            <MessageSender />
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
    view: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        color: '#FFFFFF',
        paddingTop: 10,
        paddingBottom: 10,
    },
});

export default ChatModal;
