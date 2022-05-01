import React, { useState, useEffect, useLayoutEffect, useCallback, useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

import { auth, db } from '../../firebaseConfig';
import { UserContext } from '../../contexts/user';
import makeid from '../../helper/functions';

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const currentUser = user.email.replace('@gmail.com', '');
  const { userChat } = route.params;

  var unsub;

  useEffect(() => {
    var arr = [];
    unsub = db
      .collection('userChat')
      .doc(currentUser)
      .collection('Chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        if (snapshot)
          snapshot.docs.map((doc) => {
            if (
              (doc.data().user._id === currentUser && doc.data().user.to === userChat) ||
              (doc.data().user._id === userChat && doc.data().user.to === currentUser)
            ) {
              arr.push({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
              });
            }
          });
        console.log('Snapshot');
        setMessages(arr);
      });

    console.log('got data useEffect');

    return () => {
      console.log('useEffect unsub');
      unsub();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    const randomID = makeid(10);
    const randomID2 = makeid(10);

    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user } = messages[0];

    unsub();

    db.collection('userChat')
      .doc(currentUser)
      .collection('Chats')
      .doc(randomID)
      .set({
        _id,
        createdAt,
        text,
        user,
      })
      .then(() => {
        console.log('added');
      });

    db.collection('userChat')
      .doc(userChat)
      .collection('Chats')
      .doc(randomID2)
      .set({
        _id,
        createdAt,
        text,
        user,
      })
      .then(() => {
        console.log('added to 2nd');
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showAvatarForEveryMessage={true}
      // renderBubble={() => <Text style={{ color: 'green' }}></Text>}
      user={{
        _id: auth?.currentUser?.email.replace('@gmail.com', ''),
        to: userChat,
        avatar: 'https://i.stack.imgur.com/34AD2.jpg',
      }}
    />
  );
}
