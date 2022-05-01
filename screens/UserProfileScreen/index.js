import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { db } from '../../firebaseConfig';

export default function MyProfileScreen(props) {
  const [bio, setBio] = useState('Bio not updated!');
  useEffect(() => {
    db.collection('userInfo')
      .doc(props.route.params.username)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setBio(doc.data().bio);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  return (
    <View style={{ alignItems: 'center', paddingVertical: 40 }}>
      <Image
        source={{ uri: props.route.params.profileUrl }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text style={{ paddingVertical: 10, fontSize: 18, fontWeight: 'bold' }}>
        {props.route.params.username}
      </Text>

      <Text
        style={{
          marginVertical: 25,
          backgroundColor: '#FFE4C4',
          width: '80%',
          lineHeight: 24,
          borderRadius: 8,
          padding: 10,
          fontSize: 18,
          paddingVertical: 12,
        }}
      >
        {bio}
      </Text>
    </View>
  );
}
