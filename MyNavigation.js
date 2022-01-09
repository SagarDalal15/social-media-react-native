import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';

import { UserContext } from './contexts/user';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CommentsScreen from './screens/CommentsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { logout } from './services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { ASYNC_STORAGE_KEY } from '@env';
import CreatePostScreen from './screens/CreatePostScreen';
import AddCaptionScreen from './screens/AddCaptionScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const Stack = createNativeStackNavigator();

export default function MyNavigation() {
  const [user, setUser] = useContext(UserContext);

  // Async Storage => store data
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const showAlert = (navigation) => {
    Alert.alert('Log out?', 'Are you sure, you want to log out?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'default',
        onPress: () => {
          logoutButton(navigation);
        },
      },
    ]);
  };

  const logoutButton = async (navigation) => {
    const res = await logout();
    if (res) {
      storeData(null);
      setUser(null);
    }
    AsyncStorage.clear();
    // Resetting Login Screen Index to 0
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          name="HomeScreen"
          options={({ navigation, route }) => ({
            title: ' Social Media',
            headerStyle: {
              // backgroundColor: "#f4511e",
              backgroundColor: 'white',
            },
            // headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                onPress={() => showAlert(navigation)}
                style={{
                  borderRadius: 10,
                  justifyContent: 'center',
                  padding: 5,
                  height: 35,
                  width: 80,
                  backgroundColor: 'lightblue',
                }}
              >
                <Text style={{ alignSelf: 'center' }}>LOG OUT</Text>
              </TouchableOpacity>
            ),
          })}
          component={HomeScreen}
        />
        <Stack.Screen
          name="CommentsScreen"
          options={() => ({
            title: 'Comments',
          })}
          component={CommentsScreen}
        />
        <Stack.Screen
          name="MyProfileScreen"
          options={() => ({
            title: 'My Profile',
          })}
          component={MyProfileScreen}
        />
        <Stack.Screen
          name="UserProfileScreen"
          options={() => ({
            title: 'Social Media',
          })}
          component={UserProfileScreen}
        />
        <Stack.Screen
          name="CreatePostScreen"
          options={() => ({
            title: 'Take a Picture',

            headerStyle: {
              backgroundColor: '#F1EFE3',
              fontWeight: 'bold',
            },
          })}
          component={CreatePostScreen}
        />
        <Stack.Screen name="AddCaptionScreen" component={AddCaptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
