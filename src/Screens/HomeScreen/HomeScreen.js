import React, {useEffect, useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableHighligh,
  ImageBackground,
} from 'react-native';
import HeaderCustom from '../../Components/Header';
import {ThemeColor} from '../../Constant/index';
import {useNavigation} from '@react-navigation/native';
import {Container, Header, Content, Button, Icon, Text} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import IconCar from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setModalToggle} from '../../Redux/Actions/CarModal';
import VendorModal from '../../Components/VendorModal';
import {database,Auth} from '../../../Setup';
export default function HomeScreen() {
  const dispatch = useDispatch();
  const [carDetials, setCarDetials] = useState([]);
  const carModelVisiable = useSelector((state) => state.CarModal);
  const userID = Auth().currentUser.uid;
  useEffect(() => {
    const userRef = database().ref(`users/${userID}/carDetials/`);
    const onloadingListener = userRef.on('value', (snapshot) => {
      setCarDetials([]);
      snapshot.forEach((childSnapshot) => {
        setCarDetials((cardetials) => [...cardetials, childSnapshot.val()]);
      });
    });
    const childRemovedListener = userRef.on('child_removed', (snapshot) => {
      //set your functionality what ever you want
      alert('child removed');
    });
    const childEditListener = userRef.on('child_changed', (snapshot) => {
      //set your functionality what ever you want
      alert('child edit');
    });
    return () => {
      userRef.off('value', onloadingListener);
      userRef.off('child_removed', childRemovedListener);
      userRef.off('child_changed', childEditListener);
    };
  }, []);
  console.log(carDetials);
  return (
    <View style={{flex: 1}}>
      <HeaderCustom />
      <ImageBackground
        source={require('../../Assets/img/wk2.png')}
        style={{width: hp(70), height: hp(50)}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <VendorModal />
        </View>
      </ImageBackground>
      <View
        style={{
          width: wp(30),
          position: 'absolute',
          top: hp(85),
          left: wp(60),
        }}>
        <Button
          iconLeft
          onPress={() => dispatch(setModalToggle(!carModelVisiable))}
          style={{backgroundColor: ThemeColor.mainThmemColor}}>
          <IconCar
            name="car"
            color="#ffffff"
            size={20}
            style={{paddingLeft: 15}}
          />
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Add car</Text>
        </Button>
      </View>
    </View>
  );
}
