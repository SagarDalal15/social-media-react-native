import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MessageUser from '../../components/MessageUser';
import { UserContext } from '../../contexts/user';
import { db } from '../../firebaseConfig';

export default function MessagesScreen(props) {
  const [User, setUsers] = useState([]);
  const [lastVisibleUser, setLastVisibleUser] = useState([]);
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const currentUserId = currentUser.email.replace('@gmail.com', '').toLowerCase();

  useEffect(() => {
    console.log(currentUserId);
    const unsubscribe = db
      .collection('userChat')
      .limit(5)
      .onSnapshot((snapshot) => {
        var lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastVisibleUser(lastVisible);
        let userArray = [];

        snapshot.docs.map((doc) => {
          if (doc.id != currentUserId) userArray.push({ user: doc.id });
        });
        setUsers(userArray);

        // setUsers(snapshot.docs.map((doc) => ({ user: doc.id })));
      });

    return () => {
      unsubscribe();
      setUsers([]);
      setLastVisibleUser([]);
    };
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const fetchMoreData = () => {
    if (lastVisibleUser && lastVisibleUser != []) {
      var newArray = User;

      var next = db
        .collection('userChat')
        .startAfter(lastVisibleUser)
        .limit(5)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.id != currentUserId) newArray.push({ user: doc.id });
          });

          var lastVisible = snapshot.docs[snapshot.docs.length - 1];
          setLastVisibleUser(lastVisible);
        });

      setUsers(newArray);
    }
  };

  return (
    <View style={styles.topBorder}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            fetchMoreData();
          }
        }}
        scrollEventThrottle={400}
      >
        {User.map(({ user }) => {
          return (
            <View key={user}>
              <MessageUser navigation={props.navigation} user={user} />
            </View>
          );
        })}
        <View style={{ height: 45 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topBorder: {
    borderTopWidth: 2,
    borderColor: '#C7925C',
  },
});
