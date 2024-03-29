import React, { useEffect } from 'react';
import { View } from 'react-native';

import RequireAuth from '../../RequireAuth';
import Feed from '../../components/Feed';
import BelowNavigation from '../../components/BelowNavigation';
import { db } from '../../firebaseConfig';

const HomeScreen = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#F1EFE3',
        // backgroundColor: 'wheat',
        // backgroundColor: '#fff9ed',
      }}
    >
      {/* <View style={{ marginBottom: 45 }}> */}
      <Feed navigation={props.navigation} />
      {/* </View> */}
      {/* <View
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      > */}
      <BelowNavigation navigation={props.navigation} />
      {/* </View> */}
    </View>
  );
};
export default RequireAuth(HomeScreen);
