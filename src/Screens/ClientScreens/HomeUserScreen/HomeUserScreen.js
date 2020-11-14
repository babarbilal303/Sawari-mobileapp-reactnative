import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Auth } from '../../../../Setup'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../../../Redux/Actions/user'
import AsyncStorage from '@react-native-community/async-storage';
import HeaderCustom from '../../../Components/Header'
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { ThemeColor } from '../../../Constant';
import SearchBar from '../../../Components/Search'
import { getAllDetails } from '../../../Redux/Actions/VendorDetails'
import { DETAILS } from '../../../Redux/Actions/ActionTypes';
import SecondUserScreen from '../../../Components/SecondUserScreen/index.js'
import messaging from '@react-native-firebase/messaging';
import { firebase } from '../../../../Setup'
import PushNotification from "react-native-push-notification";

export default function HomeUserScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [Alldetails, setAlldetails] = useState([])
    const alldetails = useSelector(state => state.VendorDetialsReducer);
    const logout = () => {
        dispatch(setUsername(null))
        AsyncStorage.clear();
        Auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.dispatch(StackActions.replace("welcome"))

                // navigation.reset("welcome")
            })
    }


    // Push notification
    useEffect(() => {
        requestUserPermission();
        // const unsubscribe = messaging().onMessage(async remoteMessage => {
        //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        //   });
        //   return unsubscribe;


        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // process the notification
                Alert.alert(notification.data.type)  //get from addition insformation while fill data to show in notification  like type:babar sheikh
           
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }, [])

    requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            getFcmToken() //<---- Add this
            console.log('Authorization status:', authStatus);
        }
    }
    getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken);
            console.log("Your Firebase Token is:", fcmToken);
        } else {
            console.log("Failed", "No token received");
        }
    }




    useEffect(() => {
        async function dispatchAndGetData() {
            await dispatch(getAllDetails());
            console.log("details Object.values", Object.values(alldetails));
            const allDetailsValue = Object.values(alldetails);

            setAlldetails([...allDetailsValue]);
        }
        dispatchAndGetData();

    }, [])
    return (
        <View style={{ flex: 1 }}>


            <HeaderCustom />
            <Tabs tabBarUnderlineStyle={{ backgroundColor: ThemeColor.mainThmemColor }}  >
                <Tab heading={<TabHeading style={{ backgroundColor: '#ffffff' }}><Icon name="search" style={{ color: ThemeColor.mainThmemColor }} /><Text style={{ color: ThemeColor.mainThmemColor }}>Search</Text></TabHeading>}>
                    {/* <Text style={{ color: ThemeColor.mainThmemColor }}>Search</Text> */}
                    <SearchBar />
                </Tab>
                <Tab heading={<TabHeading style={{ backgroundColor: '#ffffff' }}><Icon name="home" style={{ color: ThemeColor.mainThmemColor }} /><Text style={{ color: ThemeColor.mainThmemColor }}>Home</Text></TabHeading>}>
                    <SecondUserScreen />
                </Tab>
                <Tab heading={<TabHeading style={{ backgroundColor: '#ffffff' }}><Icon name="apps" style={{ color: ThemeColor.mainThmemColor }} /><Text style={{ color: ThemeColor.mainThmemColor }}>Camera</Text></TabHeading>}>
                    <Text>babar`=3</Text>
                </Tab>
            </Tabs>
        </View>



    )
}
const styles = StyleSheet.create({
    View1: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'red'

    },
    View2: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'green'

    },
    View3: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'yellow'

    },
    View4: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'blue'

    },
    View5: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'purple'

    },

})
