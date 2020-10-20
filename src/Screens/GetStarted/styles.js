import { StyleSheet} from 'react-native';
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
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'


    },
    btn3: {
        height: hp(9),
        width: wp(65),
        backgroundColor: '#fd5531',
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'


    },
    textbtn: {

        fontWeight: '900',
        fontSize: 17

    },

    footer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: wp(100),
        height: hp(35),

    },

})
export default styles;