import React from 'react';
import { useContext } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { UserContext } from '../contexts/user';
import { db, storage } from '../firebaseConfig';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
  username: {
    fontSize: 18,
  },
  caption: {
    fontSize: 18,
  },
  delete: {
    fontSize: 18,
    color: 'white',
  },
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
  const [user, setUser] = useContext(UserContext);

  var displayDelete = false;
  var currentUser = null;
  const postUserChecker = () => {
    if (user) {
      currentUser = user.email.replace('@gmail.com', '');
    }
    if (currentUser === username && currentUser !== null) {
      displayDelete = true;
    }
  };
  postUserChecker();

  const showAlert = () => {
    Alert.alert(
      'Delete Post!',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',

          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            deletePost();
          },
          style: 'default',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('This alert was dismissed by tapping outside of the alert dialog.'),
      },
    );
  };
  const deletePost = () => {
    //delete the image from firebase storage

    //get reference to the image file we like to delete
    var imageRef = storage.refFromURL(photoUrl);

    //delete the file
    imageRef
      .delete()
      .then(function () {
        console.log('delete successfull');
      })
      .catch(function (error) {
        console.log(`Error delete${error}`);
      });

    //2 delete the post info from firbase firestore
    db.collection('posts')
      .doc(id)
      .delete()
      .then(function () {
        console.log('delete successfull from firebase');
      })
      .catch(function (error) {
        console.log(`Error post info delete from firebase ${error}`);
      });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfileScreen', { username, profileUrl })}
        >
          <Image
            style={styles.profile}
            source={{
              uri: `${profileUrl}`,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfileScreen', { username, profileUrl })}
        >
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
        {displayDelete && (
          <TouchableOpacity
            style={{
              marginLeft: 'auto',
              // backgroundColor: '#C7925C',
              backgroundColor: 'green',
              borderRadius: 12,
              padding: 7,
              paddingVertical: 4,
            }}
            onPress={showAlert}
          >
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <Image
        style={styles.photo}
        source={{
          uri: `${photoUrl}`,
        }}
      />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{username} </Text>
        <Text style={styles.caption}>{caption}</Text>
      </View>

      <Text
        style={{ paddingTop: 5, paddingBottom: 12, color: 'grey', fontSize: 18 }}
        onPress={() => navigation.navigate('CommentsScreen', { id, comments })}
      >
        View all comments
      </Text>
    </View>
  );
}
