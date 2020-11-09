import React, { Fragment, useEffect, useState } from 'react';
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
import Loading from './src/Components/Loading/Loading'
import VendorModal from './src/Components/VendorModal/index'
import { Auth } from './Setup'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerContent } from './src/Components/DrawerContent'
import MapScreen from './src/Screens/Map';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const DrawerRoutes = ({ route }) => {



  return (
    <Drawer.Navigator initialRouteName="home" drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: 250,
      }}

    >
      <Drawer.Screen name="home" component={HomeScreen} />
    

    </Drawer.Navigator>
  )
}

export default function App() {
  const [loggenIn, setLoggedIn] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [UserName, setUserName] = useState("")
  const user = useSelector(state => state.user);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    console.log(user, "user App.js")
    // Auth().onAuthStateChanged(user => {
    if (!user) {
      setLoggedIn(false)
      setInitialLoading(false)
    } else {

      // setUserName(user.displayName)
      setUserName(user.name);
      setInitialLoading(false)
      // setTimeout(() => {
      //   setLoggedIn(true)
      // }, 3000);
      setLoggedIn(true)

      // console.log(user, "user hay")
    }
    // })



  }, [])


  return (
 



      <NavigationContainer >


        <Stack.Navigator headerMode={"none"} initialRouteName="Loading" screenOptions={{ gestureEnabled: false }}>
          {
            initialLoading ?
              <Stack.Screen name='Loading' component={Loading} />
              :
              loggenIn ?
                <>
                  <Stack.Screen name='Drawer' component={DrawerRoutes} initialParams={{ UserName: UserName }} />
                  <Stack.Screen name="map" component={MapScreen} initialParams={{ UserName: UserName }} />

                </> :

                <>

                  <Stack.Screen name="welcome" component={WelcomeScreen} />
                  <Stack.Screen name="getStartedScreen" component={GetStartedScreen} />
                  <Stack.Screen name="signUpScreen" component={SignUpScreen} />
                  <Stack.Screen name="loginScreen" component={LoginScreen} />
                  <Stack.Screen name="map" component={MapScreen} initialParams={{ UserName: UserName }} />
                  <Stack.Screen name='Drawer' component={DrawerRoutes} initialParams={{ UserName: UserName }} />


                </>

          }
        </Stack.Navigator>

      </NavigationContainer>
 
  );
}
