import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

export default function Comment({ username, com }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', padding: 6, paddingVertical: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{username}</Text>
        <Text style={{ fontSize: 16 }}>{com}</Text>
      </View>
      <Divider orientation="horizontal" width={2} />
    </View>
  );
}
