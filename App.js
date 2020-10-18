import React, {Fragment, useEffect} from 'react';
import {View, Text,Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
    <View>
      <Text>welcome</Text>
    </View>
    </Fragment>
  );
}
