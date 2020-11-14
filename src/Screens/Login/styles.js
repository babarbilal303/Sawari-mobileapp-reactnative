import { StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
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
    form: {
        height: hp(20)
    },
    LogoView: {
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
        height: hp(10),   //
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    },
    RigisterText: {
        height: hp(50),
        alignItems: 'center'
    },
    inputStyle: {
        color: '#fa472f', fontSize: 20,
    },
    error:{
        borderBottomColor:'red',
        borderRightColor:'#ffffff',
        borderLeftColor:'#ffffff',
        borderTopColor:'#ffffff',
   
        borderWidth:2
    }


})
export default styles;