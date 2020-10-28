import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, ImageBackground, ScrollView, KeyboardAvoidingView, TouchableHighlight, Alert, Button } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Item, Input, Label } from 'native-base';
import Modal from 'react-native-modal';
import { ThemeColor } from '../../Constant/index'
import { setModalToggle } from '../../Redux/Actions/CarModal'
import { useDispatch, useSelector } from 'react-redux'
export default function VendorModal(props) {
    // const [modalVisible, setModalVisible] = useState(false);
    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;

    const carModelVisiable = useSelector(state => state.CarModal);
    const dispatch = useDispatch();
    useEffect(() => {

        const timer = setTimeout(() => {
            dispatch(setModalToggle(true));

        }, 2000);


        return () => clearTimeout(timer)
    }, [])



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
                animationOut={"slideOutRight"}
                avoidKeyboard={true}

            >
              
                    <View style={{ flex: 1 }}>
                        {/* <Button title="Show modal" onPress={() => setModalVisible(!modalVisible)} /> */}

                        <View style={styles.centeredView}>
                      
                            <View style={styles.modalView}>
                                <KeyboardAvoidingView
                                    behavior='position'                              >
                                    <ScrollView >
                                        <Text style={styles.modalText}>Please Enter Your Car Details:</Text>

                                        <View style={{ height: hp(60), width: wp(80), justifyContent: 'center', alignItems: 'center' }}>

                                            <Item floatingLabel style={{ marginBottom: 8 }}>
                                                <Label>Car Company</Label>
                                                <Input

                                                />
                                            </Item>

                                            <Item floatingLabel style={{ marginBottom: 8 }}>
                                                <Label>Car Name</Label>
                                                <Input

                                                />
                                            </Item>
                                            <Item floatingLabel style={{ marginBottom: 8 }} >
                                                <Label>Car Model</Label>
                                                <Input
                                                />
                                            </Item>
                                            <Item floatingLabel style={{ marginBottom: 8 }} >
                                                <Label>Car Color </Label>
                                                <Input
                                                />
                                            </Item>
                                            <Item floatingLabel style={{ marginBottom: 8 }} >
                                                <Label> Car Number</Label>
                                                <Input
                                                    placeholderTextColor={ThemeColor.mainThmemColor}

                                                />
                                            </Item>
                                            <Item floatingLabel style={{ marginBottom: 8 }} >
                                                <Label> Per Day</Label>
                                                <Input
                                                    keyboardType={"numeric"}
                                                    placeholderTextColor={ThemeColor.mainThmemColor}

                                                />
                                            </Item>

                                            <View style={{ width: wp(20), height: hp(10), marginTop: 5 }}>
                                                <Button color={ThemeColor.mainThmemColor} title="Submit" onPress={() => dispatch(setModalToggle(false))} />
                                            </View>

                                        </View>
                                    </ScrollView>
                                </KeyboardAvoidingView>


                            </View>
                    
                        </View>
                    </View>
            
            </Modal>
        </View>

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
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        color: ThemeColor.mainThmemColor
    }
});
