import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BelowNavigation(props) {
  return (
    <View
      style={{
        position: 'absolute',
        height: 45,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'lightblue',
      }}
    >
      <TouchableOpacity
        style={{
          // borderWidth: 1,
          // borderRightWidth: 0.5,
          backgroundColor: 'wheat',
          borderTopLeftRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: '100%',
        }}
        onPress={() => props.navigation.navigate('CreatePostScreen')}
      >
        <Text>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          // borderWidth: 1,
          // borderLeftWidth: 0.5,
          justifyContent: 'center',

          alignItems: 'center',
          width: '50%',
          height: '100%',
          borderTopRightRadius: 10,
        }}
        onPress={() => props.navigation.navigate('MyProfileScreen')}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
