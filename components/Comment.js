import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from 'react-native-elements';

export default function Comment({ username, com }) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 6,
          paddingVertical: 14,
          marginHorizontal: 0,
          width: '80%',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{username} &nbsp;</Text>
        <Text style={{ fontSize: 18 }}>{com}</Text>
      </View>
      <Divider orientation="horizontal" width={2} />
    </View>
  );
}
