import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';

import { UserContext } from '../../contexts/user';
import makeid from '../../helper/functions';
import { db, storage } from '../../firebaseConfig';
import firebase from 'firebase';

export default function AddCaptionScreen(props) {
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useContext(UserContext);
  const [image, setImage] = useState();

  useEffect(() => {
    const asyncFunction = async () => {
      const fetchedImage = await fetch(props.route.params.img);
      const imageBlob = await fetchedImage.blob();

      setImage(imageBlob);
    };
    asyncFunction();
  }, []);

  useEffect(() => {
    if (progress === 100 && caption === '' && image === null) {
      props.navigation.navigate('HomeScreen');
    }
  }, [progress, image, caption]);

  const handleUpload = async () => {
    if (image) {
      var metadata = {
        contentType: 'image/jpeg',
      };

      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image, metadata);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          //progress function

          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          //get download url and upload the post info
          storage
            .ref('images')
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection('posts').add({
                timestamp: firebase.firestore.Timestamp.now(),
                caption: caption,
                photoUrl: imageUrl,
                username: user.email.replace('@gmail.com', ''),
                profileUrl: user.photoURL
                  ? user.photoURL
                  : 'https://firebasestorage.googleapis.com/v0/b/reactsocialapptutorial.appspot.com/o/images%2Fblank-profile.webp?alt=media&token=d749fb07-d371-4927-b3d7-ac16abd31c9e',
              });
            });
          setCaption('');
          setImage(null);
        },
      );
    }
  };

  return (
    <View style={{ backgroundColor: '#C7925C', height: '100%' }}>
      <Image
        style={{
          width: '100%',
          height: undefined,
          aspectRatio: 1 / 1,
          resizeMode: 'contain',
          backgroundColor: 'white',
        }}
        source={{
          uri: props.route.params.img,
        }}
      />

      <TextInput
        style={styles.textInput}
        value={caption}
        onChangeText={setCaption}
        placeholder="Add Caption..."
      />

      <Text style={styles.text} onPress={handleUpload}>
        Post {progress}
        {'%'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 10,
    marginTop: '14%',
    color: 'white',
    alignSelf: 'center',
  },
  textInput: {
    padding: 10,
    backgroundColor: 'wheat',
  },
});
