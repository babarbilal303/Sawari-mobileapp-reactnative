import React, { Component, useState } from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux'
export default WelcomeScreen = (props) => {

    const [User, setUser] = useState(false)
    const [Vendor, setVendor] = useState(false)
    const [view, setview] = useState(false)
    const dispath = useDispatch()

    const renderBottomComponent = () => {
        if (view) {
            let role = Vendor ? "vendor" : "user"
            return (

                <Button
                    onPress={() => {
                        props.navigation.navigate('getStartedScreen', {
                            Role: role,

                        })
                    }}
                    style={{ backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 100 }} >
                    <Icon name='arrowright' size={hp(3.2)} color="#fa4930" style={{ padding: 8 }}></Icon>

                </Button>



            )
        }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#242f35'

        },
        disp: {

            alignItems: 'center',

            height: hp('100%'),
            width: wp('100%')
        },
        text: {
            color: '#fd5531',
            fontSize: hp('4%'),
            fontWeight: 'bold',


        },
        text2: {
            color: '#ffffff',
            fontSize: hp('3%'),

        },
        texts: {
            height: hp('50%'),
            width: wp(100),
            justifyContent: 'center',
            alignItems: 'center'

        },
        btnview: {

            height: hp('30%'),
            width: wp(100),
            flexDirection: 'row',
            justifyContent: 'space-evenly',



        },
        btnE: {

            width: wp(37),
            height: hp(8.5),
            borderColor: User ? '#fd5531' : '#ffffff'

        },
        btnU: {

            width: wp(37),
            height: hp(8.5),
            borderColor: Vendor ? '#fd5531' : '#ffffff'

        },
        icon: {

            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(100),
            height: hp(20)

        }
    })

    return (
        <View style={styles.container}>

            {/* <ImageBackground source={require('../../Assets/img/background.jpg')} style={{ width: wp('100%'), height: hp('100%') }}> */}

            <View style={styles.disp}>
                <View style={styles.texts}>
                    <Text style={styles.text} >Welcome</Text>
                    <Text style={styles.text2} >Choose your Role</Text>
                </View>

                <View style={styles.btnview}>

                    <Button onPress={() => {

                        setUser(true);
                        setVendor(false);
                        setview(true);
                    }} style={styles.btnE} bordered block >
                        <Text style={{ color: User ? "#fd5531" : '#ffffff', fontWeight: 'bold', fontSize: hp(3.1) }}>User</Text>
                    </Button>


                    <Button onPress={() => {
                        setUser(false);
                        setVendor(true);
                        setview(true);


                    }} style={styles.btnU} bordered block  >
                        <Text style={{ color: Vendor ? "#fd5531" : '#ffffff', fontWeight: 'bold', fontSize: hp(3.1) }}>Vendor</Text>
                    </Button>
                </View>
                <View style={styles.icon}>
                    {renderBottomComponent()}
                </View>

            </View>
            {/* </ImageBackground> */}

        </View>
    )

}


