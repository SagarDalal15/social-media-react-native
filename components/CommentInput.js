import React, { useContext, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { UserContext } from '../contexts/user';
import { db } from '../firebaseConfig';

export default function CommentInput({ comments, id }) {
  const [comment, setComment] = useState('');
  const [user, setUser] = useContext(UserContext);
  const [commentArray, setCommentArray] = useState(comments ? comments : []);

  const addComment = () => {
    if (comment !== '') {
      //add comment to the post info
      commentArray.push({
        comment: comment,
        username: user.email.replace('@gmail.com', '').toLowerCase(),
      });

      db.collection('posts')
        .doc(id)
        .update({
          comments: commentArray,
        })
        .then(function () {
          setComment('');
          console.log('comment added');
        })
        .catch(function (error) {
          console.log(`Error ${error}`);
        });
    }
  };

  return (
    <View>
      <TextInput value={comment} onChangeText={(text) => setComment(text)} />
      <Button onPress={addComment} title="Post" />
    </View>
  );
}
