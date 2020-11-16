import React, { useCallback, useState } from 'react'
import { View, Text, Linking, TouchableOpacity, Button, Animated } from 'react-native'


const supportedURL = "https://google.com";


const OpenSettingsButton = ({ children }) => {
  const handlePress = useCallback(async () => {
    // Open the custom settings if the app has one
    await Linking.openSettings();
  }, []);

  return <Button title={children} onPress={handlePress} />;
};


const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};



export default function index() {
  const [BadgeScale, setBadgeScale] = useState(new Animated.Value(0));
  const [TextValue, setTextValue] = useState(0);

  const animateBadge = () => {

    BadgeScale.setValue(0);

    // setBadgeScale(new Animated.Value(0));
    setTextValue(TextValue => TextValue + 1);
    Animated.timing(BadgeScale, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // <-- Add this
    }).start();
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 100, height: 100, backgroundColor: 'red', borderRadius: 50 }}>
        <Animated.View style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 40, height: 40,
          backgroundColor: 'black',
          justifyContent: 'center', alignItems: 'center',
          borderColor: "yellow", borderWidth: 2, borderRadius: 20,
          transform: [{
            scale: BadgeScale
          }]

        }}>
          <Text style={{ color: 'white', }}>{TextValue}</Text>

        </Animated.View>



      </View>
      <Button title="add me" onPress={() => animateBadge()} />
      {/* <OpenSettingsButton>Open Settings</OpenSettingsButton>
            <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton> */}

    </View>
  )
}
