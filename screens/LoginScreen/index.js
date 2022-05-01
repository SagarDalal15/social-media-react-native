import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../contexts/user';
import { StyleSheet } from 'react-native';
import { signInWithEmail, signInWithGoogleToken, signUpWithEmail } from '../../services/auth';

import * as WebBrowser from 'expo-web-browser';
import { provider } from '../../firebaseConfig';

// expo-auth-session
import * as Google from 'expo-auth-session/providers/google';

// expo-google-app-auth
// import * as Google from "expo-google-app-auth";

import { WEB_CLIENT_ID, ASYNC_STORAGE_KEY } from '@env';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen(props) {
  const [user, setUser] = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Google OAuth for dev (Web Client) using expo-auth-session
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: `${WEB_CLIENT_ID}`,
  });

  // Google Oauth for production (Android Client) using expo-auth-session (*NOT WORKING FOR NOW)
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId:
  //     "1071064469720-jtn7fi7g188rrfag4jdghqvqab052nm9.apps.googleusercontent.com",
  // });

  //Async Storage => Read Data
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);

      return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error for reading from Async Storage
    }
  };

  // useEffect for getting user from async storage
  useEffect(() => {
    const fun = async () => {
      const userData = await getData();

      if (userData) {
        setUser(userData);

        // Resetting Home Screen Index to 0
        props.navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      }
    };
    fun();
  }, []);

  //Async Storage => Store Data
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(ASYNC_STORAGE_KEY, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const HandleGoogleOAuthRes = async (id_token) => {
    const credential = provider.credential(id_token);
    const res = await signInWithGoogleToken(credential);
    if (res) {
      setUser(res);
      storeData(res);

      // resetting Home Screen Index to 0
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } else {
      Alert.alert('Invalid Input!');
      console.log("Couldn't complete the firebase signIn");
    }
  };

  // UseEffect for expo-auth-session for dev
  useEffect(() => {
    const fun = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;

        HandleGoogleOAuthRes(id_token);
      } else {
        // response is dismiss
      }
    };
    fun();
  }, [response]);

  const googleButtonHandler = async () => {
    // For expo-auth-session for dev
    await promptAsync();

    //expo-google-app-auth for production
    // const { type, idToken, user } = await Google.logInAsync({
    //   androidClientId: `1071064469720-ebc8363qtc89dh2o2khe8tga55c29bmp.apps.googleusercontent.com`,
    //   androidStandaloneAppClientId: `1071064469720-jtn7fi7g188rrfag4jdghqvqab052nm9.apps.googleusercontent.com`,
    // });

    // if (type === "success") {
    //   HandleGoogleOAuthRes(idToken);
    // } else {
    //   // check for !success
    // }
  };

  const signUpButtonHandler = async () => {
    const res = await signUpWithEmail(email, password);

    if (res) {
      setUser(res);
      Alert.alert('Successfully Signed Up!');
    } else {
      Alert.alert('Invalid Input!');
    }
  };

  const signInButtonHandler = async () => {
    const res = await signInWithEmail(email, password);

    if (res) {
      setUser(res);
      storeData(res);

      props.navigation.reset({
        index: 0,
        routes: [{ name: 'HomeScreen' }],
      });
    } else {
      Alert.alert('Invalid Input!');
    }
  };

  return (
    <View style={styles.loginPage}>
      <View style={styles.loginPageInner}>
        <Text>Enter Your Email</Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          style={styles.textField}
          placeholder="Email"
          value={email}
        />
        <View style={{ height: 5 }} />
        <Text>Enter Your Password</Text>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.textField}
          secureTextEntry={true}
          placeholder="Password"
          value={password}
        />

        <View style={styles.twoButton}>
          <View style={{ margin: 5 }}>
            <Button onPress={signUpButtonHandler} title="       Sign Up        "></Button>
          </View>
          <View style={{ margin: 5 }}>
            <Button onPress={signInButtonHandler} title="       Sign In      "></Button>
          </View>
        </View>

        <View style={styles.gButtonView}>
          <Pressable style={styles.gButton} onPress={googleButtonHandler}>
            <Image
              style={{
                height: 45,
                width: 45,
                borderRadius: 4,
                resizeMode: 'contain',
              }}
              source={require('../../assets/googleLogo.jpeg')}
            />
            <Text style={styles.gButtonText}>Sign in with Google</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2F5',
  },
  loginPageInner: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    margin: 10,
    backgroundColor: 'white',
    width: '70%',
    padding: 10,
    borderRadius: 5,
  },

  twoButton: {
    width: '70%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  gButtonView: {
    margin: 20,
    width: '70%',
  },
  gButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#4086F5',
  },
  gButtonText: {
    fontSize: 16,
    lineHeight: 21,
    paddingRight: 26,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
