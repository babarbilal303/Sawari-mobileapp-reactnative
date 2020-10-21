import React, { Component, useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { signUpUser, submitUserObj, setUsername } from '../../Redux/Actions'
import { Auth } from '../../../Setup'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {ThemeColor} from '../../Constant'
export default function SignUpScreen(props) {

    const navigation = useNavigation();
    const [state, setstate] = useState({
        name: '',
        emailAddress: '',
        phoneNumber: '',
        cnic: '',
        password: '',

    })

    const [User, setUser] = useState();
    const dispatch = useDispatch();



    const signUP = () => {
        setstate({ ...state, id: User.uid })
        const { emailAddress, password, name, cnic, phoneNumber } = state;
        // alert(JSON.stringify(state))
        if (emailAddress.length && password.length && name.length && cnic.length && phoneNumber.length) {
            signUpUser(emailAddress, password, name, cnic, phoneNumber).then((data) => {
                const userObj = {
                    id: data.user.uid,
                    name: name,
                    email: emailAddress,
                    cnic: cnic,
                    phoneNumber: phoneNumber

                }
                dispatch(setUsername(userObj));

                submitUserObj(data.user.uid, name, emailAddress, cnic, phoneNumber).then(() => {
                    console.log("USER IS SAVED IN DB")
                })

                navigation.navigate('Drawer');
            }).catch((error) => {
                console.log("ERROR");
                alert(error)
            })
        } else {
            alert("please fell the complete form")
        }
    }
    const onAuthStateChanged = (user) => {
        setUser(user);
    }


    useEffect(() => {
        const subscriber = Auth().onAuthStateChanged(onAuthStateChanged)  //react-native firebase doc
        return subscriber;// unsubscribe on unmount
    }, []);


    return (
        <View style={styles.container} >
            <View style={styles.disp}>
                <View style={styles.navigation} >
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} >
                        <Icon name="chevron-left" size={hp(4)} color={ThemeColor.mainThmemColor} />
                    </TouchableOpacity>

                </View>
                <View style={{  height: hp(10),alignItems:'center' }} >
                    <Image source={require('../../Assets/img/logo_black.png')} style={{ width: '40%', height: "70%" }} />
                </View>
                <View style={{ height: hp(15) }} />
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={styles.keyboardContainer}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <Form style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Item rounded style={{ backgroundColor: '#ffffff', width: wp(90), borderRadius: 10,marginBottom:4 }}>

                                <Input autoFocus={true}
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.name}
                                    onChangeText={(name) => { setstate({ ...state, name: name }) }}
                                    autoCapitalize='none'
                                    placeholder="Username"
                                />
                            </Item>
                            <Item rounded style={{ backgroundColor: '#ffffff', width: wp(90), borderRadius: 10,marginBottom:4 }}>

                                <Input
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.emailAddress}
                                    onChangeText={(email) => { setstate({ ...state, emailAddress: email }) }}
                                    autoCapitalize='none'
                                    placeholder="Email"
                                />

                            </Item>
                            <Item rounded style={{ backgroundColor: '#ffffff', width: wp(90), borderRadius: 10,marginBottom:4 }}>

                                <Input keyboardType="number-pad"
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.phoneNumber}
                                    onChangeText={(phoneNumber) => { setstate({ ...state, phoneNumber: phoneNumber }) }}
                                    autoCapitalize='none'
                                    placeholder="Phone no"

                                />
                            </Item>
                            <Item rounded style={{ backgroundColor: '#ffffff', width: wp(90), borderRadius: 10,marginBottom:4 }}>

                                <Input keyboardType="number-pad"
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.cnic}
                                    onChangeText={(cnic) => { setstate({ ...state, cnic: cnic }) }}
                                    autoCapitalize='none'
                                    placeholder="Cnic no"
                                />
                            </Item>
                            <Item rounded style={{ backgroundColor: '#ffffff', width: wp(90), borderRadius: 10 }}>

                                <Input secureTextEntry keyboardType="number-pad"
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.password}
                                    onChangeText={(pass) => setstate({ ...state, password: pass })}
                                    autoCapitalize='none'
                                    placeholder="Password"
                                />
                            </Item>
                            <View style={styles.btnView}>
                                <TouchableOpacity onPress={() => signUP()} block style={{ width: '65%', justifyContent: 'center', alignItems: 'center', height: 70, borderRadius: 10, borderWidth: 2,backgroundColor:ThemeColor.mainThmemColor ,borderColor: 'white' }}>
                                    {/* <Icon name="check-circle" size={hp(3)} style={{ color: 'white' }} /> */}
                                    <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'white' }}>  Signup</Text>
                                </TouchableOpacity>

                            </View>
                        </Form>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>





            </View>
        </View>



    )

}
const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        // backgroundColor: '#242f35'
    },
    disp: {

        height: hp(100),
        width: wp(100),
    },

    navigation: {
        width: wp(100),
        height: hp(10),  //
        padding: hp(3.5)

    },
    textView: {
        width: wp(100),
        height: hp(5),  //
        justifyContent: 'center',
        alignItems: 'center',


    },
    inputView: {
        width: wp(100),
        height: hp(15), //
        // paddingVertical: hp(8),
        // paddingHorizontal: hp(2)

    },
    btnView: {
        width: wp(100),
        height: hp(50),   //
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: hp(5),
        // paddingRight: wp(10),


    }


})
