import React,{useEffect} from 'react'
import { View, Text ,ActivityIndicator,Alert} from 'react-native'
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import App from './App'
import { Provider } from 'react-redux'
import { store, persistor } from './src/Store'
import { PersistGate } from 'redux-persist/integration/react'
var firebaseConfig = {
    apiKey: "AIzaSyDHwq5ST9ojoFU-7QdB_Hj6kcKFh8uw6Sg",
    authDomain: "sawari-c4de3.firebaseapp.com",
    databaseURL: "https://sawari-c4de3.firebaseio.com",
    projectId: "sawari-c4de3",
    storageBucket: "sawari-c4de3.appspot.com",
    messagingSenderId: "299891495708",
    appId: "1:299891495708:web:30ee4af3a91d9644aba0d9",
    measurementId: "G-R3TH5VJQQG"
};
if (!firebase.apps.length) {
    //app is existing or not if not intialize firebase dont use direct it shows error
    firebase.initializeApp(firebaseConfig);
}
// export const { firebase };
export { firebase, Auth, database,storage };

export default function Setup() {

  // Push notification
  useEffect(() => {
    requestUserPermission();
  
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   });
    //   return unsubscribe;


    // const NOTIFICATION_TOPIC = __DEV__ ? 'onlytest' : 'general'
    // messaging().subscribeToTopic(NOTIFICATION_TOPIC)

    
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
        //for background notification
        messaging().onNotificationOpenedApp(onPressNotification)

        //for closed app notification
        
        messaging().getInitialNotification().then(notif => {
            if (notif) {
                onPressNotification(notif)
            }
        })
    }
}
const onPressNotification = (notif) => {
    let { data } = notif;

    if (data) {
        switch (data.type) {
            case 'open_link':
                Linking.openURL(data.link).catch(err => {
                    console.log('error opening link ', err)
                })
                break;

            default:
                break;
        }
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



    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}
