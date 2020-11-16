import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert,
  Button,
  Platform,
  SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import { Item, Input, Label } from 'native-base';
import Modal from 'react-native-modal';
import { ThemeColor } from '../../Constant/index';
import { setModalToggle, submitCarDetails_Cloud } from '../../Redux/Actions/CarModal';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from '../.././../Setup';
import { v4 as uuidv4 } from 'uuid';
import { UpdateCarDetialsVendor } from '../../Redux/Actions/user'
import PushNotification from 'react-native-push-notification'

export default function VendorModal(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const userID = Auth().currentUser.uid;
  const CarModalVisiableAdd = useSelector((state) => state.CarModalVisiableAdd);
  const CarModalVisiableEdit = useSelector((state) => state.CarModalVisiableEdit);
  const carModelVisiable = useSelector((state) => state.CarModal);
  const CarDetailForEditData = useSelector((state) => state.CarDetailsForEdit);

  const [EnabledShift, SetEnabledShift] = useState(false);
  const [state, setstate] = useState({
    Id: null,
    CarComapany: '',
    CarName: '',
    CarModel: '',
    CarColor: '',
    CarNumber: '',
    PerDay: '',
  });
  const [Updatestate, Updatesetstate] = useState({
    Id: null,
    CarComapany: '',
    CarName: '',
    CarModel: '',
    CarColor: '',
    CarNumber: '',
    PerDay: '',
    VendorID: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (true) {
      console.log(CarDetailForEditData, "CarDetailForEditData")
      Updatesetstate(oldState => ({
        ...oldState,
        Id: CarDetailForEditData.Id,
        CarComapany: CarDetailForEditData.CarComapany,
        CarName: CarDetailForEditData.CarName,
        CarModel: CarDetailForEditData.CarModel,
        CarColor: CarDetailForEditData.CarColor,
        CarNumber: CarDetailForEditData.CarNumber,
        PerDay: CarDetailForEditData.PerDay,
        VendorID: CarDetailForEditData.VendorID

      }))
    }
    return () => {
      Updatesetstate({
        VendorID: null,
        Id: null,
        CarComapany: '',
        CarName: '',
        CarModel: '',
        CarColor: '',
        CarNumber: '',
        PerDay: '',
      })
    }
    // const timer = setTimeout(() => {
    //   // dispatch(setModalToggle(true));
    // }, 2000);

    // return () => clearTimeout(timer);
  }, [CarDetailForEditData]);






  const UpdateCarDetail = (UpdateCarObj) => {



    console.log("update CAr value", UpdateCarObj);
    dispatch(UpdateCarDetialsVendor(UpdateCarObj));
    dispatch(setModalToggle(false));
    LocalNotification(UpdateCarObj);
    props.buttonAnimation();


  }
  const submitCarDetails = () => {

    // alert(JSON.stringify(state));
    const { Id, CarComapany, CarName, CarModel, CarColor, CarNumber, PerDay } = state;

    // user.providerData.forEach((userInfo) => {
    //     console.log('User info for provider: ', userInfo);
    //   })
    console.log(props, 'props');
    if (
      CarComapany.length &&
      CarName.length &&
      CarModel.length &&
      CarColor.length &&
      CarNumber.length &&
      PerDay.length
    ) {
      const CarDetialObj = {
        VendorID: userID,
        Id,
        CarComapany,
        CarName,
        CarModel,
        CarColor,
        CarNumber,
        PerDay,
      };
      console.log(CarDetialObj, 'CarDetail dispatch ');
      //   dispatch(setUsername(userObj));
      submitCarDetails_Cloud(CarDetialObj)
      dispatch(setModalToggle(false))

    } else {
      alert('please fell the complete form');
    }
  };
  const toggleEditing = () => {
    setEditing(!isEditing);
  }
  const RenderModal = () => {
    if (CarModalVisiableAdd) {
      return (
        <View >
          <Modal
            animationIn="slideInRight"
            isVisible={carModelVisiable}
            onBackButtonPress={() => {
              dispatch(setModalToggle(!carModelVisiable))
              props.buttonAnimation();
            }}
            deviceWidth={deviceWidth}
            deviceHeight={deviceHeight}
            onBackdropPress={() => {
              dispatch(setModalToggle(false))
              props.buttonAnimation();
            }}
            animationInTiming={600}
            animationOut={'slideOutRight'}
            avoidKeyboard={true}>
            <View style={{ flex: 1 }}>
              {/* <Button title="Show modal" onPress={() => setModalVisible(!modalVisible)} /> */}

              <View style={styles.centeredView}>
                <KeyboardAvoidingView behavior="position" style={styles.modalView} enabled={EnabledShift}>

                  <Text style={!EnabledShift && styles.modalText}>
                    Please Enter Your Car Details:
                    </Text>

                  <View
                    style={{
                      height: hp(60),
                      width: wp(80),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>

                    <Item floatingLabel style={{ marginBottom: 8 }}>
                      <Label>Car Company</Label>
                      <Input
                        onFocus={() => SetEnabledShift(false)}
                        onChangeText={(carC) => {

                          setstate({ ...state, CarComapany: carC });

                        }}
                      />
                      <Button onPress={() => toggleEditing()}><Text>Edit</Text></Button>
                    </Item>

                    <Item floatingLabel style={{ marginBottom: 8 }}>
                      <Label>Car Name</Label>
                      <Input
                        onFocus={() => SetEnabledShift(false)}
                        onChangeText={(carName) => {
                          setstate({ ...state, CarName: carName });
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 8 }}>
                      <Label>Car Model</Label>
                      <Input
                        onFocus={() => SetEnabledShift(false)}
                        onChangeText={(CarModel) => {
                          setstate({ ...state, CarModel: CarModel });
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 8 }}>
                      <Label>Car Color </Label>
                      <Input
                        onFocus={() => SetEnabledShift(false)}
                        onChangeText={(CarColor) => {
                          setstate({ ...state, CarColor: CarColor });
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 8 }}>
                      <Label> Car Number</Label>
                      <Input
                        onFocus={() => SetEnabledShift(false)}
                        placeholderTextColor={ThemeColor.mainThmemColor}
                        onChangeText={(CarNumber) => {
                          setstate({ ...state, CarNumber: CarNumber });
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{ marginBottom: 8 }}>
                      <Label> Per Day</Label>
                      <Input
                        keyboardType={'numeric'}
                        onFocus={() => SetEnabledShift(true)}
                        placeholderTextColor={ThemeColor.mainThmemColor}
                        onChangeText={(PerDay) => {
                          setstate({ ...state, PerDay: PerDay });
                        }}
                      />
                    </Item>

                    <View style={{ width: wp(20), height: hp(10), marginTop: 5 }}>
                      <Button
                        color={ThemeColor.mainThmemColor}
                        title="Submit"
                        // onPress={() => dispatch(setModalToggle(false))}
                        onPress={() => submitCarDetails()}
                      />
                    </View>
                  </View>

                </KeyboardAvoidingView>
              </View>
            </View>

          </Modal>
        </View>
      );
    } else if (CarModalVisiableEdit) {


      return (


        <Modal
          animationIn="slideInRight"
          isVisible={carModelVisiable}
          onBackButtonPress={() => dispatch(setModalToggle(!carModelVisiable))}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          onBackdropPress={() => dispatch(setModalToggle(false))}
          animationInTiming={600}
          animationOut={'slideOutRight'}
        >
          {/* <Button title="Show modal" onPress={() => setModalVisible(!modalVisible)} /> */}

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <KeyboardAvoidingView
                enabled={EnabledShift}
                behavior={'position'}
                style={{ flex: 1 }} >
                <Text style={styles.modalText}>
                  Please Enter Your Car Details:
                    </Text>

                <View
                  style={{
                    height: hp(60),
                    width: wp(80),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>

                  <Item floatingLabel style={{ marginBottom: 8 }}>
                    <Label>Car Company</Label>
                    <Input
                      value={Updatestate.CarComapany}
                      onChangeText={(carC) => {

                        Updatesetstate({ ...Updatestate, CarComapany: carC });

                      }}
                    />
                    <Button onPress={() => toggleEditing()}><Text>Edit</Text></Button>
                  </Item>

                  <Item floatingLabel style={{ marginBottom: 8 }}>
                    <Label>Car Name</Label>
                    <Input
                      value={Updatestate.CarName}
                      onChangeText={(carName) => {
                        Updatesetstate({ ...Updatestate, CarName: carName });
                      }}
                    />
                  </Item>
                  <Item floatingLabel style={{ marginBottom: 8 }}>
                    <Label>Car Model</Label>
                    <Input
                      value={Updatestate.CarModel}
                      onChangeText={(CarModel) => {
                        Updatesetstate({ ...Updatestate, CarModel: CarModel });
                      }}
                    />
                  </Item>
                  <Item floatingLabel style={{ marginBottom: 8 }}>
                    <Label>Car Color </Label>
                    <Input
                      value={Updatestate.CarColor}
                      onChangeText={(CarColor) => {
                        Updatesetstate({ ...Updatestate, CarColor: CarColor });
                      }}
                    />
                  </Item>
                  <Item floatingLabel style={{ marginBottom: 8 }}>
                    <Label> Car Number</Label>
                    <Input
                      value={Updatestate.CarNumber}
                      placeholderTextColor={ThemeColor.mainThmemColor}
                      onChangeText={(CarNumber) => {
                        Updatesetstate({ ...Updatestate, CarNumber: CarNumber });
                      }}
                    />
                  </Item>
                  <Item floatingLabel style={{ marginBottom: 8 }}>
                    <Label> Per Day</Label>
                    <Input
                      onFocus={() => SetEnabledShift(true)}
                      value={Updatestate.PerDay}
                      keyboardType={'numeric'}
                      placeholderTextColor={ThemeColor.mainThmemColor}
                      onChangeText={(PerDay) => {
                        Updatesetstate({ ...Updatestate, PerDay: PerDay });
                      }}
                    />
                  </Item>

                  <View style={{ width: wp(20), height: hp(10), marginTop: 5 }}>
                    <Button
                      color={ThemeColor.mainThmemColor}
                      title="UPDATE"
                      // onPress={() => dispatch(setModalToggle(false))}
                      onPress={() => UpdateCarDetail(Updatestate)}
                    />
                  </View>
                </View>
              </KeyboardAvoidingView>

            </View>

          </View>
        </Modal>

      );
    }
  }




  const LocalNotification = (data) => {
    // console.log(data,"data local")
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
          console.log('LOCAL NOTIFICATION ==>', notification)
      },
      popInitialNotification: true,
      requestPermissions: true
  })
    PushNotification.localNotification({
      autoCancel: true,
      bigText:
        'Get Your Own Drive',
      subText: 'Updated Car Details',
      title: 'Updated Car Details',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      // actions: '["Yes", "No"]'
    })
  }
  return (
    <React.Fragment>
      {
        RenderModal()
      }
    </React.Fragment>

  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: hp(3),
  },
  modalView: {
    height: hp(70),
    width: wp(100),
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: ThemeColor.mainThmemColor,
  },
});
