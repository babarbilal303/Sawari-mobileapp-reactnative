import { StyleSheet} from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
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
export default styles;