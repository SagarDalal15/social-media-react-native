import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';

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

  const logoutButton = async (navigation) => {
    const res = await logout();
    if (res) {
      storeData(null);
      setUser(null);
    }

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
            title: 'My Home Page',
            headerStyle: {
              // backgroundColor: "#f4511e",
              backgroundColor: 'white',
            },
            // headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => logoutButton(navigation)}
                style={{
                  borderRadius: 10,

                  justifyContent: 'center',
                  padding: 5,
                  height: 40,
                  backgroundColor: 'blue',
                }}
              >
                <Text style={{ color: 'white' }}>LOG OUT</Text>
              </TouchableOpacity>
            ),
          })}
          component={HomeScreen}
        />
        <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
        <Stack.Screen name="AddCaptionScreen" component={AddCaptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
