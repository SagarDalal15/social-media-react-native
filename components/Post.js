import React from 'react';
import { Button, Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-web';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  photo: {
    width: '100%',
    height: undefined,
    aspectRatio: 4 / 3,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  profile: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 40,
    width: 40,
  },
});

export default function Post({
  profileUrl,
  username,
  id,
  photoUrl,
  caption,
  comments,
  navigation,
}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <Image
          style={styles.profile}
          source={{
            uri: `${profileUrl}`,
          }}
        />
        <Text>{username}</Text>
        <TouchableOpacity
          onPress={}
          >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>

      <Image
        style={styles.photo}
        source={{
          uri: `${photoUrl}`,
        }}
      />
      
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold' }}>{username} </Text>
        <Text>{caption}</Text>
      </View>

      <Text
        style={{ paddingTop: 5, paddingBottom: 12, color: 'grey' }}
        onPress={() => navigation.navigate('CommentsScreen', { id, comments })}
      >
        View all comments
      </Text>
    </View>
  );
}
