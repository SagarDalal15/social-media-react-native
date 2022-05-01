import React, { useContext } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

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
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';

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
        <Stack.Screen
          options={() => ({
            title: 'Social Media',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          options={({ navigation, route }) => ({
            title: ' Social Media',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
            // headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => showAlert(navigation)}
                  style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    padding: 5,
                    height: 35,
                    width: 80,
                    backgroundColor: 'wheat',
                  }}
                >
                  <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: 'black' }}>
                    LOG OUT
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MessagesScreen')}
                  style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    padding: 0,
                    height: 35,
                    width: 86,
                    backgroundColor: 'wheat',
                    marginHorizontal: 5,
                  }}
                >
                  <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>MESSAGES</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
          component={HomeScreen}
        />
        <Stack.Screen
          name="CommentsScreen"
          options={() => ({
            title: 'Comments',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          component={CommentsScreen}
        />
        <Stack.Screen
          name="MyProfileScreen"
          options={() => ({
            title: 'My Profile',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          component={MyProfileScreen}
        />
        <Stack.Screen
          name="UserProfileScreen"
          options={() => ({
            title: 'Social Media',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          component={UserProfileScreen}
        />
        <Stack.Screen
          name="CreatePostScreen"
          options={() => ({
            title: 'Take a Picture',
            headerStyle: {
              backgroundColor: 'lightgreen',
              fontWeight: 'bold',
            },
          })}
          component={CreatePostScreen}
        />
        <Stack.Screen
          name="AddCaptionScreen"
          options={() => ({
            title: 'Add Caption',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          component={AddCaptionScreen}
        />
        <Stack.Screen
          name="MessagesScreen"
          options={() => ({
            title: 'Messages',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          component={MessagesScreen}
        />
        <Stack.Screen
          name="ChatScreen"
          options={() => ({
            title: 'Messages',
            headerStyle: {
              backgroundColor: 'lightgreen',
            },
          })}
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
