import React from 'react';
import { View } from 'react-native';

import RequireAuth from '../../RequireAuth';
import Feed from '../../components/Feed';
import BelowNavigation from '../../components/BelowNavigation';

const HomeScreen = (props) => {
  return (
    <View
      style={{
        backgroundColor: '#F1EFE3',
      }}
    >
      <View style={{ marginBottom: 45 }}>
        <Feed navigation={props.navigation} />
      </View>
      <BelowNavigation navigation={props.navigation} />
    </View>
  );
};
export default RequireAuth(HomeScreen);
