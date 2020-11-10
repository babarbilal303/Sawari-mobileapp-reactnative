import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
export default function DEMO() {
    return (
        <View style={{ flex: 1 }}>

            <View style={styles.View1}></View>
            <View style={styles.View2}></View>
            <View style={styles.View3}></View>
            <View style={styles.View4}></View>
            <View style={styles.View5}></View>
            
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
