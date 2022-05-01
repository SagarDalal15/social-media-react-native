import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BelowNavigation(props) {
  return (
    <View
      style={{
        position: 'absolute',
        height: 50,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: '#C7925C',
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
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Create Post</Text>
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
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
