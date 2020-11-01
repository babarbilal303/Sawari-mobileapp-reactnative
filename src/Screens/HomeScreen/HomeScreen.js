import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableHighligh,
  ImageBackground,
  FlatList
} from 'react-native';
import HeaderCustom from '../../Components/Header';
import { ThemeColor } from '../../Constant/index';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Content, Button, Icon, Text } from 'native-base';
import Loading from '../../Components/Loading/Loading'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import IconCar from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { setModalToggle } from '../../Redux/Actions/CarModal';
import VendorModal from '../../Components/VendorModal';
import { database, Auth } from '../../../Setup';
import CardCarDetail from '../../Components/CardCarDetails/CardCarDetail'
export default function HomeScreen() {
  const dispatch = useDispatch();
  const [carDetials, setCarDetials] = useState([]);
  const [isloaded, setisloaded] = useState(false);
  const [refresh, setrefresh] = useState(null);
  const carModelVisiable = useSelector((state) => state.CarModal);
  const userID = Auth().currentUser.uid;
  // const [userID, setUserId] = useState("");

  useEffect(() => {
    // Auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     return;
    //   } else {

    
    //     setUserId(user.uid);
    //     console.log(userID, "userID hay")
  
    //   }
    // })
    if (userID != null) {
      const userRef = database().ref(`users/${userID}/carDetials/`);
      const onloadingListener = userRef.on('value', (snapshot) => {
        setCarDetials([]);
        snapshot.forEach((childSnapshot) => {
          console.log(childSnapshot, "chil")
          setCarDetials((cardetials) => [...cardetials, childSnapshot.val()]);

        });
        setisloaded(true)
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
    }
  }, []);
  refresh_Flatlist = (fresh) => {
    console.log(fresh, "deletekey")
    setrefresh(fresh ? fresh : 'red')

  }
  return (
    <View style={{ flex: 1 }}>
      <HeaderCustom />
      {/* <ImageBackground
        source={require('../../Assets/img/wk2.png')}
        style={{width: hp(70), height: hp(50)}}> */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <VendorModal />
      </View>
      {/* </ImageBackground> */}
      { isloaded ?

        <FlatList
          data={carDetials}
          // keyExtractor={(item, index) => item.CarNumber}
          extraData={carDetials}

          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            console.log(`Item: ${JSON.stringify(item)} and index: ${index}`)
            return (

              <CardCarDetail items={item} index={index} parentFlatlist={this}  >

              </CardCarDetail>

            )
          }}

        /> :

        <Loading />
      }



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
          style={{ backgroundColor: ThemeColor.mainThmemColor }}>
          <IconCar
            name="car"
            color="#ffffff"
            size={20}
            style={{ paddingLeft: 15 }}
          />
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Add car</Text>
        </Button>
      </View>
    </View>
  );
}
