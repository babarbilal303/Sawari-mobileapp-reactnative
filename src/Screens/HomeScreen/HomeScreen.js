import React, { useEffect, useState } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableHighligh,
  ImageBackground,
  FlatList,
  Animated,
  PanResponder
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
import { setModalToggle, ModalTOggleONADD, ModalTOggleONEDIT } from '../../Redux/Actions/CarModal';
import { UpdateCarDetialsInUser } from '../../Redux/Actions/user';

import VendorModal from '../../Components/VendorModal';
import { database, Auth } from '../../../Setup';
import CardCarDetail from '../../Components/CardCarDetails/CardCarDetail'
import { Paragraph } from 'react-native-paper';
export default function HomeScreen() {


  // HEADER animation
  const scrollY = new Animated.Value(0)

  // when scroll up any point 
  const diffClamp = Animated.diffClamp(scrollY, 0, hp(8))
  //for scroll down hide header
  // const translalteY = scrollY.interpolate({
  //   inputRange: [0, hp(8)], //hp(8) header height is hp(8) when a user scoll  hp(8) then show transition and move up the header -hp(8) output range
  //   outputRange: [0, hp(-8)]

  // })
  // for both work
  const translalteY = diffClamp.interpolate({
    inputRange: [0, hp(8)], //hp(8) header height is hp(8) when a user scoll  hp(8) then show transition and move up the header -hp(8) output range
    outputRange: [0, hp(-8)]

  })

  //Animation
  const [startAnimation, SetstartAnimation] = useState(0);
  const position = new Animated.ValueXY({ x: 0, y: 0 });
  useEffect(() => {
    Animated.timing(position, {

      toValue: { x: startAnimation, y: 20 },
      duration: 2000,
      useNativeDriver: true

    }).start()




  }, [startAnimation])


  const updateStateAnimationASaProps = () => {
    SetstartAnimation(0)
  }




  //for gesture handler
  // const pan = PanResponder.create({
  //   onMoveShouldSetPanResponder: () => true,

  //   // onPanResponderMove: (e, gesture) => {
  //   //   console.log(e, gesture)
  //   // position.setValue({ x: gesture.dx, y: gesture.dy })
  //   // }
  //   // OR BOTH ARE SAME
  //   onPanResponderMove: Animated.event([
  //     null,
  //     { dx: position.x, dy: position.y } //when i move my figer on screen changing the postion x and y changing dx value
  //   ]),


  //   onPanResponderRelease: () => {
  //     // position.setValue({ x: 0, y: 0 }) //again set to intail value when release

  //     Animated.spring(position, {

  //       toValue: { x: 0, y: 0 },
  //       // duration: 2000,
  //       bounciness: 10,
  //       speed: 1,
  //       useNativeDriver: true

  //     }).start()
  //   }
  // })



  // spring animation
  // Animated.spring(position, {

  //   toValue: { x: 95, y: 5 },
  //   // duration: 2000,
  //   bounciness: 10,
  //   speed: 1,
  //   useNativeDriver: true

  // }).start()

  const rotate = position.x.interpolate({   //only rotate on x axis beacuse we set x
    inputRange: [0, 100],
    outputRange: ["0deg", "360deg"]
  })


  const dispatch = useDispatch();
  const [carDetials, setCarDetials] = useState([]);
  const [isloaded, setisloaded] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const carModelVisiable = useSelector((state) => state.CarModal);
  const carDetialsReduxState = useSelector((state) => state.user ? state.user.carDetials : null);
  const userID = Auth().currentUser.uid;

  useEffect(() => {
    return () => {
      console.log("cleaned up");
    };
  }, []);

  useEffect(() => {

    if (userID != null) {
      const userRef = database().ref(`users/${userID}/carDetials/`);
      const onloadingListener = userRef.on('value', (snapshot) => {
        setCarDetials([]);

        snapshot.forEach((childSnapshot) => {
          // dispatch(UpdateCarDetialsInUser((childSnapshot) => [...childSnapshot, childSnapshot.val()]));

          setCarDetials((cardetials) => [...cardetials, childSnapshot.val()]);
          console.log("cardetails local state", carDetials)

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
  console.log("cardetails local state", carDetials)

  // refresh_Flatlist = (fresh) => {
  //   console.log(fresh, "deletekey")``
  //   setrefresh(fresh ? fresh : 'red')

  // }
  useEffect(() => {
    updateCARDetailsInREDUX();

  }, [carDetials]);

  const updateCARDetailsInREDUX = () => {
    console.log("cardetails local state", carDetialsReduxState)
    dispatch(UpdateCarDetialsInUser(carDetials));

  }
  console.log("cardetails redux state", carDetialsReduxState)


  const AddCarDetails = () => {

    SetstartAnimation(82)
    dispatch(ModalTOggleONADD())
    dispatch(setModalToggle(!carModelVisiable))
    setrefresh(!refresh);

  }
  return (
    <View style={{ flex: 1 }}>
      {/* <Animated.View style={{


        transform: [
          { translateY: translalteY }
        ],
        // elevation: 4,
        // zIndex: 100,
        // borderWidth:1 //for header hide

      }}> */}
      <View>
        <HeaderCustom />

      </View>
      {/* </Animated.View> */}
      {/* <ImageBackground
        source={require('../../Assets/img/wk2.png')}
        style={{width: hp(70), height: hp(50)}}> */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <VendorModal buttonAnimation={updateStateAnimationASaProps} />
      </View>
      {/* </ImageBackground> */}
      <View style={{ flex: 1 }}>
        {isloaded ?
          <FlatList

            extraData={refresh} //for update a flat list
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y) //how much user scroll =e.nativeEvent.contentOffset.y
            }}
            data={carDetialsReduxState}
            keyExtractor={(item, index) => item.Id}
            renderItem={({ item, index }) => {
              console.log(`Item: ${JSON.stringify(item)} and index: ${index}`)
              return (

                <CardCarDetail key={item.Id} items={item} index={index} parentFlatlist={this}  >

                </CardCarDetail>

              )
            }}

          /> :

          <Loading />
        }
      </View>
      {/* <View style={{ backgroundColor: 'red' }}>
        <Animated.View style={{
          transform:[
            { translateX: position.x },
          ]
        }}>
          <Text>babar</Text>
        </Animated.View>


      </View> */}

      <Animated.View
        // {...pan.panHandlers} //for gesture handle move Component 
        style={{
          width: wp(30),
          position: 'absolute',
          top: hp(85),
          left: wp(65),
          transform: [
            { translateX: position.x },
            // { rotate: rotate },
            // { translateY: position.y }
          ]
        }}>
        <Button
          iconLeft
          onPress={() => {

            AddCarDetails()

          }}
          style={{ backgroundColor: ThemeColor.mainThmemColor }}>
          <IconCar
            name="car"
            color="#ffffff"
            size={20}
            style={{ paddingLeft: 15 }}
          />
          <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Add car</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
