import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { db } from '../firebaseConfig';
import Post from './Post';

export default function Feed(props) {
  const [posts, setPosts] = useState([]);
  const [lastVisiblePosts, setLastVisiblePosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .limit(5)
      .onSnapshot((snapshot) => {
        var lastVisible = snapshot.docs[snapshot.docs.length - 1];
        setLastVisiblePosts(lastVisible);

        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      });

    return () => {
      unsubscribe();
      setPosts([]);
      setLastVisiblePosts([]);
    };
  }, []);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  const fetchMoreData = () => {
    if (lastVisiblePosts && lastVisiblePosts != []) {
      var newArray = posts;

      var next = db
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .startAfter(lastVisiblePosts)
        .limit(5)
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            newArray.push({ id: doc.id, post: doc.data() });
          });

          var lastVisible = snapshot.docs[snapshot.docs.length - 1];
          setLastVisiblePosts(lastVisible);
        });

      setPosts(newArray);
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            fetchMoreData();
          }
        }}
        scrollEventThrottle={400}
      >
        {posts.map(({ id, post }) => {
          return (
            <View key={id}>
              <Post
                navigation={props.navigation}
                key={id}
                id={id}
                profileUrl={post.profileUrl}
                username={post.username}
                photoUrl={post.photoUrl}
                caption={post.caption}
                comments={post.comments}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
