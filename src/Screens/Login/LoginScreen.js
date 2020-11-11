import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { setUsername, signInUser } from '../../Redux/Actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native';
import { connect, useSelector, useDispatch } from "react-redux";
import styles from './styles'
import { ThemeColor } from '../../Constant'
import { database } from '../../../Setup'
import Loading from '../../Components/Loading/Loading'

function LoginScreen(props) {
    const navigation = useNavigation();


    const [state, setstate] = useState({
        emailAddress: '',
        password: ''
    })
    const [activityIndicator, SetactivityIndicator] = useState(false)
    const username = useSelector(state => state.user);
    const dispatch = useDispatch();

    const signin = () => {

        signInUser(state.emailAddress, state.password).then((data) => {
            SetactivityIndicator(true);
            const userRef = database().ref(`users/${data.user.uid}`);
            const onloadingListener = userRef.on('value', (snapshot) => {
                dispatch(setUsername(snapshot._snapshot.value));
            
                // snapshot.forEach((childSnapshot) => {
                //     dispatch(setUsername(childSnapshot));
                // });
            
                snapshot._snapshot.value.Role == "vendor" ? navigation.navigate('Drawer') : navigation.navigate('userDrawer')
                SetactivityIndicator(false);
            });


        }).catch((error) => {
            console.log("ERROR");
            alert(error)
        })

    }

    console.log(username, "redux data")
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior='height'>
                <View style={styles.disp}>
                    <View style={styles.navigation}>
                        <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ color: 'red' }}>
                            <Icon name="chevron-left" size={hp(4)} color={ThemeColor.mainThmemColor} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.LogoView}>
                        <Image source={require('../../Assets/img/logo_black.png')} style={{ width: wp(30), height: hp(15) }} />
                    </View>
                    <View style={{ height: hp(10) }} />
                    <View style={styles.form}>

                        <Form style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <Item style={{ width: wp(80), marginBottom: 4, borderColor: ThemeColor.mainThmemColor }}>


                                <Input
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.emailAddress}
                                    onChangeText={(email) => { setstate({ ...state, emailAddress: email }) }}
                                    autoCapitalize='none'
                                    placeholder="Email"
                                />
                            </Item>
                            <View style={{ height: hp(2) }} />
                            <Item style={{ width: wp(80), marginBottom: 4, borderColor: ThemeColor.mainThmemColor }}>

                                <Input secureTextEntry keyboardType={'number-pad'}
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.password}
                                    onChangeText={(pass) => setstate({ ...state, password: pass })}
                                    autoCapitalize='none'
                                    placeholder="Password"
                                />
                            </Item>

                        </Form>
                    </View>

                    <View style={styles.btnView}>
                        <Button onPress={() => signin()} block style={{ width: wp(60), height: hp(10), borderRadius: 10, backgroundColor: ThemeColor.mainThmemColor, alignItems: 'center' }}>
                            <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'white' }}>  Login</Text>
                        </Button>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('signUpScreen')} style={styles.RigisterText}>
                        <Text>Don't have an account? Create New Accout</Text>

                        {activityIndicator ?
                            <ActivityIndicator size="large" color={ThemeColor.mainThmemColor} /> : null
                        }
                    </TouchableOpacity>

                   


                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//     };
// };
// const mapDispatchToProps = (dispatch) => {
//     return {
//         changeUser: (name) => dispatch(setUsername(name))
//     }
// }

// export default connect(mapStateToProps)(LoginScreen);
export default LoginScreen;