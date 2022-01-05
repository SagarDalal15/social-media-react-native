import React, { useContext } from "react";
import { View } from "react-native";

import { UserContext } from "./contexts/user";

export default (ChildComponent) => {
  const ComposedComponent = (props) => {
    const [user, setUser] = useContext(UserContext);
    if (user) {
      return (
        <View>
          <ChildComponent {...props} />
        </View>
      );
    } else {
      return null;
    }
  };

  return ComposedComponent;
};
