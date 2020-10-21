import React, { Fragment, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './src/Screens/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from './src/Screens/GetStarted/GetStartedScreen'
import SignUpScreen from './src/Screens/Signup/SignUp'
import LoginScreen from './src/Screens/Login/LoginScreen'
import HomeScreen from './src/Screens/HomeScreen/HomeScreen'
import {DrawerContent} from './src/Components/DrawerContent'
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const drawerRoutes = ({ route }) => {



  return (
    <Drawer.Navigator  initialRouteName="home" drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="home" component={HomeScreen} />
    </Drawer.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <NavigationContainer >
        <Stack.Navigator headerMode={"none"} initialRouteName="welcome">
          <Stack.Screen name='Drawer' component={drawerRoutes} />
          <Stack.Screen name="welcome" component={WelcomeScreen} />
          <Stack.Screen name="getStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="signUpScreen" component={SignUpScreen} />
          <Stack.Screen name="loginScreen" component={LoginScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
