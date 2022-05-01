import React, { useContext, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebaseConfig';

export default function MyProfileScreen() {
  const [user, setUser] = useContext(UserContext);
  const [value, onChangeText] = React.useState('Edit Bio!');

  const currentUser = user.email.replace('@gmail.com', '');

  useEffect(() => {
    db.collection('userInfo')
      .doc(currentUser)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          onChangeText(doc.data().bio);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  const saveBio = () => {
    db.collection('userInfo')
      .doc(currentUser)
      .set({
        bio: value,
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    showAlert();
  };

  const showAlert = () => {
    Alert.alert(
      'Saved!',
      'Changes saved successfully.',
      [
        {
          text: 'Ok',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  return (
    <View style={{ alignItems: 'center', paddingVertical: 40 }}>
      <Image
        source={{ uri: user.photoURL }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={{ paddingVertical: 10, fontSize: 18, fontWeight: 'bold' }}>
        {user.email.replace('@gmail.com', '')}
      </Text>
      <TextInput
        style={{
          marginVertical: 25,
          backgroundColor: 'white',
          width: '80%',
          lineHeight: 24,
          borderRadius: 8,
          padding: 10,
          fontSize: 18,
        }}
        editable
        multiline
        maxLength={100}
        onChangeText={(text) => onChangeText(text)}
        value={value}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#C7925C',
          borderRadius: 5,
          paddingHorizontal: 25,
          paddingVertical: 8,
        }}
        onPress={saveBio}
      >
        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
