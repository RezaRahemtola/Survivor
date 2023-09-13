import { useState } from "react";
import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";

export const MessageSender = () => {

    const [message, setMessage] = useState(String);

    return (
        <View style={{ flexDirection: "row",}}>
            <TextInput
                style={styles.textInput}
                placeholder="Send a message"
                placeholderTextColor={"white"}
                onChangeText={setMessage}
                value={message}
            />
            <TouchableWithoutFeedback onPress={() => {console.log("Send")}}>
                <Icon name="send" source="MaterialIcons" size={25} style={{ alignSelf: 'flex-end', marginRight: 15, marginTop: 25, flex: 2}} color="#FFFFFF" />
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
