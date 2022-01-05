import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function BelowNavigation(props) {
  return (
    <View
      style={{
        position: "absolute",
        height: 45,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",

        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "lightgreen",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
        onPress={() => props.navigation.navigate("CreatePostScreen")}
      >
        <Text>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "lightblue",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100%",
        }}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
}
