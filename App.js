import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './src/Screens/WelcomeScreen/WelcomeScreen'
import GetStartedScreen from './src/Screens/GetStarted/GetStartedScreen'
import SignUpScreen from './src/Screens/Signup/SignUp'
import LoginScreen from './src/Screens/Login/LoginScreen'
import HomeScreen from './src/Screens/HomeScreen/HomeScreen'
import Loading from './src/Components/Loading/Loading'
import MapScreen from './src/Screens/Map';
import HomeUserScreen from './src/Screens/ClientScreens/HomeUserScreen/HomeUserScreen'
import VendorDetailsScreen from './src/Screens/ClientScreens/VendorDetailsScreen/VendorDetailsModal'
import { Auth } from './Setup'
import { useDispatch, useSelector } from 'react-redux'
import { DrawerContent } from './src/Components/DrawerContent'
import { UserDrawerContent } from './src/Components/UserDrawer/UserDrawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ThemeColor } from './src/Constant/index'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = ({ route }) => {
  return (
    <Tab.Navigator initialRouteName="home"
      // tabBarOptions={{
      //   labelStyle: {
      //     // color: 'red',
      //     fontSize: 20,


      //   },
      //   activeTintColor:'red',
      //   inactiveTintColor:'black'
      // }} 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'gear' : 'gear';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{

        activeTintColor: '#ffffff',
        inactiveTintColor: 'gray',
        labelStyle: {
          // color: 'red',
          fontSize: 15,


        },
        style: {
          backgroundColor: ThemeColor.mainThmemColor
        }

      }}


    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={30} color={color} />,

        }}


      />
      <Tab.Screen name="Settings" component={Loading}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome name="gear" size={30} color={color} />,
        }} />
    </Tab.Navigator>
  );
}
const UserDrawerRoutes = ({ route }) => {



  return (
    <Drawer.Navigator initialRouteName="homeUserScreen" drawerContent={props => <UserDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: 250,
      }}

    >
      <Drawer.Screen name="homeUserScreen" component={HomeUserScreen} />


    </Drawer.Navigator>
  )
}

const DrawerRoutes = ({ route }) => {



  return (
    <Drawer.Navigator initialRouteName="myTab" drawerContent={props => <DrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: 250,
      }}

    >
      <Drawer.Screen name="myTab" component={MyTabs} />
      {/* home screen Inside Tab Navigator */}

      {/* <Drawer.Screen name="home" component={HomeScreen} /> */}


    </Drawer.Navigator>
  )
}
// ANIMATION STACk
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};


export default function App() {
  const [loggenIn, setLoggedIn] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [UserName, setUserName] = useState("")
  const user = useSelector(state => state.user);
  const [Vendor, setVendor] = useState(false);
  const [userClient, setuserClient] = useState(false)

  const VendorLogin = () => {
    return <>
      <Stack.Screen name='Drawer' component={DrawerRoutes} initialParams={{ UserName: UserName }} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="getStartedScreen" component={GetStartedScreen} />
      <Stack.Screen name="signUpScreen" component={SignUpScreen} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="map" component={MapScreen} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='userDrawer' component={UserDrawerRoutes} initialParams={{ UserName: UserName }} />

    </>
  }
  const UserLogin = () => {
    return <>

      <Stack.Screen name='userDrawer' component={UserDrawerRoutes} initialParams={{ UserName: UserName }} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="getStartedScreen" component={GetStartedScreen} />
      <Stack.Screen name="signUpScreen" component={SignUpScreen} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="map" component={MapScreen} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='userHomeScreen' component={HomeUserScreen} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='Drawer' component={DrawerRoutes} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='VendorDetailsScreen' component={VendorDetailsScreen} initialParams={{ UserName: UserName }} />

    </>
  }
  const NotLogin = () => {
    return <>

      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="getStartedScreen" component={GetStartedScreen} />
      <Stack.Screen name="signUpScreen" component={SignUpScreen} />
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="map" component={MapScreen} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='Drawer' component={DrawerRoutes} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='userHomeScreen' component={HomeUserScreen} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='userDrawer' component={UserDrawerRoutes} initialParams={{ UserName: UserName }} />
      <Stack.Screen name='VendorDetailsScreen' component={VendorDetailsScreen} initialParams={{ UserName: UserName }} />



    </>
  }




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
      if (user.Role == "vendor") {
        setVendor(true);
      } else if (user.Role == "user") {
        setuserClient(true);
      }

      // console.log(user, "user hay")
    }
    // })



  }, [])


  return (




    <NavigationContainer >


      <Stack.Navigator
        headerMode={"none"}
        initialRouteName="Loading"
        screenOptions={{
          gestureEnabled: true, gestureDirection: 'horizontal',
          ...TransitionPresets.SlideFromRightIOS,  //builtn stack animations

          transitionSpec: {
            open: config,
            close: config //confg is defined above App function it is for animation customiztion 
          }
          // ...CardStyleInterpolators.forScaleFromCenterAndroid //builtn stack animations

        }}
        headerMode="none" //when we use navigation header animation chnge screen
      >
        {
          initialLoading ?
            <Stack.Screen name='Loading' component={Loading} />
            :
            loggenIn ?
              Vendor ?
                <>
                  {
                    VendorLogin()
                  }
                </> :
                userClient ?
                  <>

                    {
                      UserLogin()
                    }

                  </>
                  :
                  <>

                    {
                      NotLogin()
                    }

                  </>


              : <>
                {
                  NotLogin()
                }
              </>
        }
      </Stack.Navigator>

    </NavigationContainer>

  );
}
