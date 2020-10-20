import React, { Component } from 'react'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconC from 'react-native-vector-icons/Feather'
import CodeInput from 'react-native-confirmation-code-input';



export default class VerificationCodeScreen extends Component {
    state = {
        hardcode: '1815',
        authentic: false
    }
    static navigationOptions = {
        headerShown: false
    }



    componentDidMount() {
        this.checkVerificationCode();

    }
    componentWillMount(){
    Alert.alert('ITS YOUR VERIFICATION CODE DUDE "1815"')
    }
    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }

    checkVerificationCode(code) {

        if (code == this.state.hardcode) {

            this.setState({
                authentic: true
            })
            this.props.navigation.navigate('Loading')



        } else {

        }

    }
    render() {

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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
        height: hp(25), //
        paddingVertical: hp(8),
        paddingHorizontal: hp(2)

    },
    checkView: {
        height:hp(38) ,  //
        justifyContent: 'center',
        alignItems: 'center'
    }


})

        let var2 = <Text> signup to access this content </Text>

        return (
            <View style={styles.container}>
                <View style={styles.disp}>
                    <View style={styles.navigation}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginDetial') }} style={{ color: 'red' }}>
                            <Icon name="chevron-left" size={hp(4)} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textView}>
                        <Text style={{ fontSize: hp(3.8), fontWeight: 'bold' }}>Enter Verification Code</Text>

                        <Text style={{ fontSize: hp(2.1), }}>We have sent verification code to {}</Text>
                    </View>


                    <View style={styles.inputView}>
                        <Text style={{ textAlign: 'center', fontSize: hp(3), fontWeight: 'bold', color: '#959699' }}>VERIFICATION CODE </Text>
                        <CodeInput
                            ref="codeInputRef1"
                            keyboardType="numeric"
                            className={'border-b'}
                            space={10}
                            fontSize={30}
                            fontWeight="bold"
                            size={60}
                            codeLength={4}
                            inputPosition='center'
                            activeColor='#fa4831'
                            inactiveColor='grey'
                            onFulfill={(code) => this.checkVerificationCode(code)}
                        />
                    </View>

                    <View style={styles.checkView}>


                        {this.state.authentic ? (<Icon name="check-circle" size={hp(10)} style={{ color: '#48c90b' }} />) :
                            (<Texts />)}


                    </View>

                </View>
            </View>



        )
    }

}
export const Texts = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , height:hp(100)}}>
            <Text style={{ fontSize: hp(2.8), color: 'grey' }}>I didn't get a code!</Text>
            <Text style={{ fontSize: hp(3), fontWeight: 'bold', borderBottomWidth: 1, }}>Resend Code</Text>
            <View style={{ paddingTop: hp(4), flexDirection: 'row' }}>
                <Text style={{ fontSize: hp(2), color: 'grey' }}>Having trouble? Call u    </Text>
                <IconC name="phone-call" size={hp(4.5)} color="#fa5c48" />
            </View>
        </View>
    )
}
