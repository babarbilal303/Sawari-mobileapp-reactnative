import React from 'react'
import { View, Text ,ActivityIndicator} from 'react-native'
import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage';

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
    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
}
