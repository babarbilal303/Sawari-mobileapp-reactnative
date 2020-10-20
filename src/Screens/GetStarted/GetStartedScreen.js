import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import Iconf from 'react-native-vector-icons/MaterialCommunityIcons'
import IconI from 'react-native-vector-icons/Ionicons'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';


export default class GetStartedScreen extends Component {

    
    render() {
        
        return (
            <View style={styles.container}>


                <View style={styles.disp}>

                    <View style={styles.navigation}>
                        <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
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
                            <Button style={styles.btn3} onPress={() => this.props.navigation.navigate('signUpScreen')}>
                                <Text style={styles.textbtn}>Signup </Text>
                                <IconI name='trail-sign-outline' size={hp(6)} color="white" />

                            </Button>
                            <Button style={styles.btn2} onPress={() => this.props.navigation.navigate('loginScreen')}>
                                <Text style={styles.textbtn}>Login </Text>
                                <Iconf name='login' size={hp(6)} color="#242f35" />

                            </Button>
                        </View>

                    </View>

                </View>


            </View>
        )
    }
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#242f35'
    },
    disp: {
        height: hp(100),
        width: wp(100),
        alignItems: 'center'
    },
    navigation: {
        width: wp(100),
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: hp(20),
        width: wp(95),
        padding: hp(3.5)

    },
    text: {
        fontSize: hp(3.5),
        color: '#ffff'
    },

    logoView: {
        alignItems: 'center',
        height: hp(20),
        width: wp(100),
    },
    subtitleView: {
        alignItems: 'center',
        height: hp(15),
        width: wp(100),
    },


    btn: {
        height: hp(9),
        width: wp(78),
        backgroundColor: '#385b93',
        marginVertical: 10,
        borderRadius: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-around'


    },
    btn2: {
        height: hp(9),
        width: wp(65),
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'


    },
    btn3: {
        height: hp(9),
        width: wp(65),
        backgroundColor: '#fd5531',
        marginVertical: 10,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'


    },
    textbtn: {
        color: "#242f35",
        fontWeight: '900',
        fontSize: 20

    },
    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: wp(100),
        height: hp(35),



    },


})
