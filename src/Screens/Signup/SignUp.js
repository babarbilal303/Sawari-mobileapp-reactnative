import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome'
import { signUpUser, submitUserObj } from '../../Api Services/ApiServices'
import { Auth, database } from '../../../Setup'

import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen(props) {
    const navigation = useNavigation();


    const [state, setstate] = useState({
        name: '',
        emailAddress: '',
        cnic: '',
        password: ''
    })
    const [User, setUser] = useState();

    const signUP = (props) => {

        const { emailAddress, password, name, cnic } = state;
        // alert(JSON.stringify(state))
        if (emailAddress.length && password.length && name.length && cnic.length) {
            signUpUser(emailAddress, password, name, cnic).then((data) => {
                alert(data);
                submitUserObj(User.uid,name, User.email, cnic).then(()=>{
                    console.log("done user obj in db")
                })


                navigation.navigate('map');
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

    console.log(User, "user")
    return (
        <View style={styles.container}>
            <View style={styles.disp}>
                <View style={styles.navigation}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ color: 'red' }}>
                        <Icon name="chevron-left" size={hp(4)} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.textView}>
                    <Text style={{ fontSize: hp(4.8), fontWeight: 'bold', textAlign: 'center', color: '#fa472f' }}>SIGN UP </Text>


                </View>
                <Form style={{justifyContent:'center',alignItems:'center'}}>
                    <Item floatingLabel style={{backgroundColor:'#ffffff' ,width:wp(80)}}>
                        <Label>Name</Label>
                        <Input autoFocus={true}
                            style={{ color: '#fa472f', fontSize: 20 }}
                            value={state.name}
                            onChangeText={(name) => { setstate({ ...state, name: name }) }}
                        />
                    </Item>
                    <Item floatingLabel style={{backgroundColor:'#ffffff'  ,width:wp(80)}}>
                        <Label>Email</Label>
                        <Input
                            style={{ color: '#fa472f', fontSize: 20 }}
                            value={state.emailAddress}
                            onChangeText={(email) => { setstate({ ...state, emailAddress: email }) }}
                        />
                    </Item>
                    <Item floatingLabel style={{backgroundColor:'#ffffff'  ,width:wp(80)}}>
                        <Label>Cnic no</Label>
                        <Input keyboardType="number-pad"
                            style={{ color: '#fa472f', fontSize: 20}}
                            value={state.cnic}
                            onChangeText={(cnic) => { setstate({ ...state, cnic: cnic }) }}
                        />
                    </Item>
                    <Item floatingLabel style={{backgroundColor:'#ffffff'  ,width:wp(80)}}>
                        <Label>Password</Label>
                        <Input secureTextEntry
                            style={{ color: '#fa472f', fontSize: 20 }}
                            value={state.password}
                            onChangeText={(pass) => setstate({ ...state, password: pass })}

                        />
                    </Item>
                    <View style={styles.btnView}>
                        <Button onPress={() => signUP()} block style={{ width: '35%', height: 70, borderRadius: 10, borderWidth: 2, backgroundColor: 'red', borderColor: 'white' }}>
                            <Icon name="check-circle" size={hp(6)} style={{ color: 'white' }} />
                            <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'white' }}>  Next</Text>
                        </Button>

                    </View>
                </Form>





            </View>
        </View>



    )

}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#242f35'
    },
    disp: {

        height: hp(100),
        width: wp(100),
    },

    navigation: {
        width: wp(100),
        height: hp(15),  //
        padding: hp(3.5)

    },
    textView: {
        width: wp(100),
        height: hp(10),  //
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
        justifyContent: 'flex-end',
        paddingVertical: hp(7),
        paddingRight: wp(10)

    }


})
