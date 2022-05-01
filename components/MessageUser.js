import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MessageUser({ user, navigation }) {
  const onChatHeadClick = () => {
    navigation.navigate('ChatScreen', { userChat: user });
  };
  return (
    <View>
      <TouchableOpacity onPress={onChatHeadClick} style={styles.chatBox}>
        <Text style={styles.text}>{user}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  chatBox: {
    padding: 10,
    paddingVertical: 15,
    borderColor: '#C7925C',
    borderWidth: 2,
    borderTopWidth: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'wheat',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});
