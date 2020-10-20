import React, { Component } from 'react'
import { Text, View, ImageBackground, StyleSheet } from 'react-native'
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
export default class WelcomeScreen extends Component {
    state = {
        view: false,
        english: false,
        urdu: false

    }

    componentDidMount() {
        lor(this);
    }

    componentWillUnmount() {
        rol();
    }
    renderBottomComponent() {
        if (this.state.view) {
            return (

                <Button onPress={() => { this.props.navigation.navigate('getStartedScreen') }} style={{ backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 100 }} >
                    <Icon name='arrowright' size={hp(3.2)} color="#fa4930" style={{ padding: 8 }}></Icon>

                </Button>



            )
        }
    }

    render() {
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
                borderColor: this.state.english ? '#fd5531' : '#ffffff'

            },
            btnU: {

                width: wp(37),
                height: hp(8.5),
                borderColor: this.state.urdu ? '#fd5531' : '#ffffff'

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
                            this.setState({ view: true, english: true, urdu: false })
                        }} style={styles.btnE} bordered block >
                            <Text style={{ color: this.state.english ? "#fd5531" : '#ffffff', fontWeight: 'bold', fontSize: hp(3.1) }}>User</Text>
                        </Button>


                        <Button onPress={() => {
                            this.setState({ view: true, urdu: true, english: false })
                        }} style={styles.btnU} bordered block  >
                            <Text style={{ color: this.state.urdu ? "#fd5531" : '#ffffff', fontWeight: 'bold', fontSize: hp(3.1) }}>Vendor</Text>
                        </Button>
                    </View>
                    <View style={styles.icon}>
                        {this.renderBottomComponent()}
                    </View>

                </View>
                {/* </ImageBackground> */}

            </View>
        )
    }
}


