import React, {Fragment, useEffect} from 'react';
import {View, Text,Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/Screens/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from './src/Screens/GetStarted/GetStartedScreen'
import SignUpScreen from './src/Screens/Signup/SignUp'
import LoginScreen from './src/Screens/Login/LoginScreen'
import Map from './src/Screens/Map/Map'

const Stack = createStackNavigator();


export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <NavigationContainer >
      <Stack.Navigator headerMode={"none"}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="getStartedScreen" component={GetStartedScreen} />
        <Stack.Screen name="signUpScreen" component={SignUpScreen} />
        <Stack.Screen name="loginScreen" component={LoginScreen} />

        <Stack.Screen name="map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
    </Fragment>
  );
}
