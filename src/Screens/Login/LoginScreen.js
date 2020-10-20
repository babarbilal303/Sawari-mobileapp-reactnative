import React, { Component, useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
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
function LoginScreen(props) {
    const navigation = useNavigation();


    const [state, setstate] = useState({
        emailAddress: '',
        password: ''
    })

    const username = useSelector(state => state.user);
    const dispatch = useDispatch();

    const signin = () => {

        signInUser(state.emailAddress, state.password).then((data) => {
            alert("sign in bro")
            const userObj = {
                id: data.user.uid,
                name: data.user.displayName,
                email: data.user.email
            }
            dispatch(setUsername(userObj));
        }).catch((error) => {
            console.log("ERROR");
            alert(error)
        })

    }

    console.log(username, "redux data")
    return (
        <View style={styles.container}>
            <View style={styles.disp}>
                <View style={styles.navigation}>
                    <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ color: 'red' }}>
                        <Icon name="chevron-left" size={hp(4)} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.textView}>
                    <Text style={{ fontSize: hp(4.8), fontWeight: 'bold', textAlign: 'center', color: '#fa472f' }}>Login </Text>

                </View>
                <Form style={{ justifyContent: 'center', alignItems: 'center' }}>

                    <Item floatingLabel style={{ backgroundColor: '#ffffff', width: wp(80) }}>

                        <Label>Email:</Label>
                        <Input
                            style={{ color: '#fa472f', fontSize: 20 }}
                            value={state.emailAddress}
                            onChangeText={(email) => { setstate({ ...state, emailAddress: email }) }}
                            autoCapitalize='none'
                        />
                    </Item>

                    <Item floatingLabel style={{ backgroundColor: '#ffffff', width: wp(80) }}>
                        <Label>Password:</Label>
                        <Input secureTextEntry keyboardType={'number-pad'}
                            style={{ color: '#fa472f', fontSize: 20 }}
                            value={state.password}
                            onChangeText={(pass) => setstate({ ...state, password: pass })}
                            autoCapitalize='none'
                        />
                    </Item>
                    <View style={styles.btnView}>
                        <Button onPress={() => signin()} block style={{ width: '35%', height: 70, borderRadius: 10, borderWidth: 2, backgroundColor: 'red', borderColor: 'white' }}>
                            <Icon name="check-circle" size={hp(6)} style={{ color: 'white' }} />
                            <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'white' }}>  Next</Text>
                        </Button>
                    </View>
                </Form>

            </View>
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