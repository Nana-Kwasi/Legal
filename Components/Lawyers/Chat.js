import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default class Chat extends React.Component {
  state = {
    messages: [
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bot",
        },
      },
    ],
  };

  onSend = (newMessages = []) => {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, newMessages),
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(newMessages) => this.onSend(newMessages)}
          user={{
            _id: 1, // This should be a unique identifier for the user
            name: "User",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
