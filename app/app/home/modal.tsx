import { MessageSender } from "@/components/MessageSender";
import { Message } from "@/types/message";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { FlatList } from "react-native-gesture-handler";

let messages: Message[] = [
    {
        message: "Test",
        sender: "Me",
    },
    {
        message: "Test",
        sender: "Me",
    },
    {
        message: "AJIUHHJ",
        sender: "Other",
    },
    {
        message: "Test",
        sender: "Other",
    },
    {
        message: "AJIUHHJ",
        sender: "Other",
    },
    {
        message: "Test",
        sender: "Other",
    },
    {
        message: "AJIUHHJ",
        sender: "Other",
    },
    {
        message: "Test",
        sender: "Me",
    },
    {
        message: "AJIUHHJ",
        sender: "Other",
    },
    {
        message: "Test",
        sender: "Me",
    },
    {
        message: "AJIUHHJ",
        sender: "Other",
    },
    {
        message: "Test",
        sender: "Me",
    },
    {
        message: "AJIUHHJhjkhkjkjkjnkjnkzqfndnkqjn",
        sender: "Other",
    },
    {
        message: "Test",
        sender: "Me",
    },
    {
        message: "AJIUHHJ",
        sender: "Other",
    },
];

const ChatModal = () => {

    const colorScheme = useColorScheme();

    return (
        <View style={styles.view}>
            <FlatList inverted
                    data={[...messages].reverse()}
                    renderItem={ ({item}) =>
                    <View>
                        <View style={item.sender === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }}>
                            <Text style={[ colorScheme === "dark" ? styles.textWhite : styles.textBlack, { marginRight: 20, marginLeft: 20, fontSize: 12 } ]}>
                                { item.sender }
                            </Text>
                        </View>
                        <View style={item.sender === "Me" ? { flexDirection: "row", justifyContent: "flex-end" } : { flexDirection: "row", justifyContent: "flex-start" }}>
                            <View style={colorScheme === "dark" ? styles.textWrapWhite : styles.textWrapBlack }>
                                <Text style={colorScheme === "dark" ? styles.textBlack : styles.textWhite}>{item.message}</Text>
                            </View>
                        </View>
                    </View> }
            />
            <MessageSender />
        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-end",
    },
    textWrapBlack: {
        maxWidth: "50%",
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 25,
        backgroundColor: "#000000",
        margin: 10,
        marginTop: 3,
    },
    textWrapWhite: {
        maxWidth: "50%",
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 25,
        backgroundColor: "#FFFFFF",
        margin: 10,
        marginTop: 3,
    },
    textBlack: {
        color: "#000000",
    },
    textWhite: {
        color: "#FFFFFF",
    },
});

export default ChatModal;
