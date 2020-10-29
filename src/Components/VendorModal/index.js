import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import {Item, Input, Label} from 'native-base';
import Modal from 'react-native-modal';
import {ThemeColor} from '../../Constant/index';
import {setModalToggle,submitCarDetails_Cloud} from '../../Redux/Actions/CarModal';
import {useDispatch, useSelector} from 'react-redux';
import {Auth} from '../.././../Setup';

export default function VendorModal(props) {
  // const [modalVisible, setModalVisible] = useState(false);
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const userID = Auth().currentUser.uid;

  const carModelVisiable = useSelector((state) => state.CarModal);
  const [state, setstate] = useState({
    CarComapany: '',
    CarName: '',
    CarModel: '',
    CarColor: '',
    CarNumber: '',
    PerDay: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setModalToggle(true));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const submitCarDetails = () => {
    console.log('wprkogm');
    alert(JSON.stringify(state));
    const {CarComapany, CarName, CarModel, CarColor, CarNumber, PerDay} = state;

    // user.providerData.forEach((userInfo) => {
    //     console.log('User info for provider: ', userInfo);
    //   })
    console.log(userID, 'user details');
    if (
      CarComapany.length &&
      CarName.length &&
      CarModel.length &&
      CarColor.length &&
      CarNumber.length &&
      PerDay.length
    ) {
      const CarDetialObj = {
        Id: userID,
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
      //   submitUserObj(
      //     data.user.uid,
      //     name,
      //     emailAddress,
      //     cnic,
      //     phoneNumber,
      //     route.params.Role,
      //   )
      //     .then(() => {
      //       console.log('USER IS SAVED IN DB');
      //     })
      //     .catch((error) => {
      //       console.log('ERROR');
      //       alert(error);
      //     });

      //   navigation.navigate('map', {UserName: name});
    } else {
      alert('please fell the complete form');
    }
  };

  return (
    <View>
      <Modal
        animationIn="slideInRight"
        isVisible={carModelVisiable}
        onBackButtonPress={() => dispatch(setModalToggle(!carModelVisiable))}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        // onBackdropPress={() => dispatch(setModalToggle(false))}
        animationInTiming={600}
        animationOut={'slideOutRight'}
        avoidKeyboard={true}>
        <View style={{flex: 1}}>
          {/* <Button title="Show modal" onPress={() => setModalVisible(!modalVisible)} /> */}

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <KeyboardAvoidingView behavior="position">
                <ScrollView>
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
                    <Item floatingLabel style={{marginBottom: 8}}>
                      <Label>Car Company</Label>
                      <Input
                        onChangeText={(carC) => {
                          setstate({...state, CarComapany: carC});
                        }}
                      />
                    </Item>

                    <Item floatingLabel style={{marginBottom: 8}}>
                      <Label>Car Name</Label>
                      <Input
                        onChangeText={(carName) => {
                          setstate({...state, CarName: carName});
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{marginBottom: 8}}>
                      <Label>Car Model</Label>
                      <Input
                        onChangeText={(CarModel) => {
                          setstate({...state, CarModel: CarModel});
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{marginBottom: 8}}>
                      <Label>Car Color </Label>
                      <Input
                        onChangeText={(CarColor) => {
                          setstate({...state, CarColor: CarColor});
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{marginBottom: 8}}>
                      <Label> Car Number</Label>
                      <Input
                        placeholderTextColor={ThemeColor.mainThmemColor}
                        onChangeText={(CarNumber) => {
                          setstate({...state, CarNumber: CarNumber});
                        }}
                      />
                    </Item>
                    <Item floatingLabel style={{marginBottom: 8}}>
                      <Label> Per Day</Label>
                      <Input
                        keyboardType={'numeric'}
                        placeholderTextColor={ThemeColor.mainThmemColor}
                        onChangeText={(PerDay) => {
                          setstate({...state, PerDay: PerDay});
                        }}
                      />
                    </Item>

                    <View style={{width: wp(20), height: hp(10), marginTop: 5}}>
                      <Button
                        color={ThemeColor.mainThmemColor}
                        title="Submit"
                        // onPress={() => dispatch(setModalToggle(false))}
                        onPress={() => submitCarDetails()}
                      />
                    </View>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
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
