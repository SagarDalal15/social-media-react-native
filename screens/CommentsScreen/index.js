import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Comment from "../../components/Comment";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebaseConfig";

export default function CommentsScreen({ route }) {
  const [comment, setComment] = useState("");
  const [user, setUser] = useContext(UserContext);

  const [allComments, setAllComments] = useState([]);
  const commentArray = allComments;

  const scrollViewRef = useRef();

  useEffect(() => {
    if (route.params.comments) {
      setAllComments(route.params.comments);
    }

    return () => {
      setAllComments([]);
      setComment("");
    };
  }, []);

  const addComment = () => {
    if (comment !== "") {
      //add comment to the post info

      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });

      setComment("");
      // Add comment to database
      db.collection("posts")
        .doc(route.params.id)
        .update({
          comments: commentArray,
        })
        .then(function () {
          console.log("comment added");

          // // get all comments and set to AllComments
          // db.collection("posts")
          //   .doc(route.params.id)
          //   .get()
          //   .then((doc) => {
          //     console.log("updated data");
          //       setAllComments(doc.data().comments);
          //   });
        })
        .catch(function (error) {
          console.log(`Error ${error}`);
        });

      // scrolling to end
      scrollViewRef.current.scrollToEnd({ animated: true });
      // Dismiss keyboard
      Keyboard.dismiss();
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="always"
        style={{
          marginBottom: 80,
          paddingTop: 2,
          paddingHorizontal: 5,
        }}
      >
        {allComments &&
          allComments.map((comment, idx) => (
            <View key={idx}>
              <Comment username={comment.username} com={comment.comment} />
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: "white",
          bottom: 0,
        }}
      >
        <TextInput
          style={{
            paddingLeft: 12,
            paddingRight: 12,
            fontSize: 20,
            height: 45,
          }}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity onPress={addComment}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              paddingVertical: 14,
              width: "100%",
              backgroundColor: "blue",
              fontSize: 18,
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
