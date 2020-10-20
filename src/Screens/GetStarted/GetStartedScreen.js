import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import Iconf from 'react-native-vector-icons/MaterialCommunityIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import styles from "./styles";
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';


export default GetStartedScreen = (props) => {




    return (
        <View style={styles.container}>


            <View style={styles.disp}>

                <View style={styles.navigation}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }}>
                        <Icon name="chevron-left" size={hp(4)} color="white" />
                    </TouchableOpacity>

                </View>

                <View style={styles.logoView}>
                    <Image source={require('../../Assets/img/logo.png')} style={{ width: wp(60), height: hp(30) }} />
                </View>



                <View style={styles.subtitleView} />
                <View style={styles.footer}>
                    <Text style={{ fontSize: hp(2.5), color: 'white' }} >Let's Get Started</Text>
                    <View style={{ height: hp(10) }} />
                    <View>

                        <TouchableOpacity style={styles.btn3} onPress={() => props.navigation.navigate('signUpScreen')}>
                            <Text style={{ ...styles.textbtn, color: '#ffffff' }}>Signup </Text>
                            <IconI name='trail-sign-outline' size={hp(4)} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn2} onPress={() => props.navigation.navigate('loginScreen')}>
                            <Text style={{ ...styles.textbtn, color: '#000000' }}>Login </Text>
                            <Iconf name='login' size={hp(4)} color="#242f35" />

                        </TouchableOpacity>
                    </View>

                </View>

            </View>


        </View>
    )

}


