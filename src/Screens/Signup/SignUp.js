import React, { Component, useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'
import { signUpUser, submitUserObj, setUsername } from '../../Redux/Actions'
import { Auth, storage } from '../../../Setup'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeColor } from '../../Constant'
import { Picker } from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-picker';
import Loading from '../../Components/Loading/Loading'


export default function SignUpScreen({ route }, props) {
    const username = useSelector(state => state.user);
    const [SelectedImageUrl, setSelectedImageUrl] = useState('')
    const [DownloadImage, setDownloadImage] = useState('')
    const navigation = useNavigation();
    const [selectedValue, setSelectedValue] = useState("Johar");
    const [imageLoaded, SetImageLoaded] = useState(false)
    const [state, setstate] = useState({
        name: '',
        emailAddress: '',
        phoneNumber: '',
        cnic: '',
        password: '',

    })

    const [User, setUser] = useState();
    const dispatch = useDispatch();

    const [EnabledShift, SetEnabledShift] = useState(false);


    const ImageHandler = () => {
        const options = {
            title: 'Select Profile Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            SetImageLoaded(true);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                // this.setState({
                //     selectedPictureUri: uri,
                // });
                setSelectedImageUrl(uri)
                // console.log('store image in state',SelectedImageUrl)
            }
        });
        if (SelectedImageUrl) {

            storage().ref("profile-picture/" + state.emailAddress).putFile(SelectedImageUrl).then(res => {
                console.log('storege workinng')
                storage().ref("profile-picture/" + state.emailAddress).getDownloadURL().then(url => {
                    console.log("image has been uploaded ")
                    // navigation.navigate("Category", {
                    //     Name: name,
                    //     CNIC: CNIC,
                    //     Address: address,
                    //     DOB: DOB,
                    //     ProfilePicture: url,
                    //     phoneNumber: phoneNumber
                    // })
                    setDownloadImage(url);

                    console.log("download Image in State: ", DownloadImage, url)
                    SetImageLoaded(false);
                }).catch(err => {

                    alert(err)
                })
            }).catch(err => {
                alert(err)
            })

        }




    }
    const signUP = async () => {
        // setstate({ ...state, id: User.uid })
        const { emailAddress, password, name, cnic, phoneNumber } = state;
        // alert(JSON.stringify(state))



        if (emailAddress.length && password.length && name.length && cnic.length && phoneNumber.length && selectedValue.length) {
            signUpUser(emailAddress, password, name, phoneNumber).then((data) => {
                const userObj = {
                    Id: data.user.uid,
                    Name: name,
                    Email: emailAddress,
                    Cnic: cnic,
                    PhoneNuber: phoneNumber,
                    Role: route.params.Role,
                    Area: selectedValue,
                    Profile_Url: DownloadImage

                }
                console.log(userObj, "signup dispatch userOBJ")
                dispatch(setUsername(userObj));

                submitUserObj(data.user.uid, name, emailAddress, cnic, phoneNumber, route.params.Role, selectedValue, DownloadImage).then(() => {
                    console.log("USER IS SAVED IN DB")
                })
                userObj.Role == "vendor" ? navigation.navigate('Drawer') : navigation.navigate('userDrawer')
                // navigation.navigate('Drawer', { UserName: name });
                // navigation.navigate('map', { UserName: name });

            }).catch((error) => {
                console.log("ERROR");
                alert(error)
            })
        } else {
            alert("please fell the complete form")
        }
    }
    const onAuthStateChanged = (user) => {
        setUser(user);
    }

    useEffect(() => {
        const subscriber = Auth().onAuthStateChanged(onAuthStateChanged)  //react-native firebase doc
        return subscriber;// unsubscribe on unmount
    }, []);


    return (


        <KeyboardAvoidingView KeyboardAvoidingView behavior='position' enabled={EnabledShift} style={styles.container} >
            {!imageLoaded ?
                <View>
                    <View style={styles.disp}>
                        <View style={styles.navigation} >
                            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                                <Icon name="chevron-left" size={hp(4)} color={ThemeColor.mainThmemColor} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: hp(10), alignItems: 'center' }} >
                        <Image source={require('../../Assets/img/logo.png')} style={{ width: '35%', height: "90%" }} />
                    </View>
                    <View style={{ height: hp(5) }} />


                    <Form style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View>
                            <Item style={{ width: wp(90), borderRadius: 10, marginBottom: 4, borderColor: ThemeColor.mainThmemColor }}>

                                <Input
                                    // autoFocus={true}
                                    style={{ color: '#fa472f', fontSize: 20 }}

                                    value={state.name}
                                    onChangeText={(name) => { setstate({ ...state, name: name }) }}
                                    autoCapitalize='none'
                                    placeholder="Username"
                                    onFocus={() => SetEnabledShift(false)}
                                    placeholderTextColor="#ffffff"

                                />
                            </Item>
                        </View>

                        <View>

                            <Item style={{ width: wp(90), borderRadius: 10, marginBottom: 4, borderBottomWidth: 2, borderColor: ThemeColor.mainThmemColor }}>

                                <Input
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.emailAddress}
                                    onChangeText={(email) => { setstate({ ...state, emailAddress: email }) }}
                                    autoCapitalize='none'
                                    placeholder="Email"
                                    onFocus={() => SetEnabledShift(false)}
                                    placeholderTextColor="#ffffff"
                                />

                            </Item>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => ImageHandler()}   >
                                <Text >Choose File</Text>
                            </TouchableOpacity>

                        </View>
                        <View>

                            <Item style={{ width: wp(90), borderRadius: 10, marginBottom: 4, borderColor: ThemeColor.mainThmemColor }}>

                                <Input keyboardType="number-pad"
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.phoneNumber}
                                    onChangeText={(phoneNumber) => { setstate({ ...state, phoneNumber: phoneNumber }) }}
                                    autoCapitalize='none'
                                    placeholder="Phone no"
                                    onFocus={() => SetEnabledShift(false)}
                                    placeholderTextColor="#ffffff"

                                />
                            </Item>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Label style={{ color: '#ffffff' }}>Select your area:</Label>
                            <Picker
                                selectedValue={selectedValue}
                                dropdownIconColor="#ffffff"
                                style={{ height: 50, width: wp(50), color: '#ffffff' }}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedValue(itemValue)
                                }>

                                <Picker.Item label="Johar" value="Johar" />
                                <Picker.Item label="Hadeed" value="Hadeed" />
                                <Picker.Item label="Malir" value="Malir" />
                            </Picker>
                        </View>


                        <View>

                            <Item style={{ width: wp(90), borderRadius: 10, marginBottom: 4, borderColor: ThemeColor.mainThmemColor }}>

                                <Input keyboardType="number-pad"
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.cnic}
                                    onChangeText={(cnic) => { setstate({ ...state, cnic: cnic }) }}
                                    autoCapitalize='none'
                                    placeholder="Cnic no"
                                    onFocus={() => SetEnabledShift(true)}
                                    placeholderTextColor="#ffffff"
                                />
                            </Item>

                        </View>
                        <View>
                            <Item style={{ width: wp(90), borderRadius: 10, borderColor: ThemeColor.mainThmemColor }}>

                                <Input secureTextEntry keyboardType="number-pad"
                                    style={{ color: '#fa472f', fontSize: 20 }}
                                    value={state.password}
                                    onChangeText={(pass) => setstate({ ...state, password: pass })}
                                    autoCapitalize='none'
                                    placeholder="Password"
                                    onFocus={() => SetEnabledShift(true)}
                                    placeholderTextColor="#ffffff"
                                />
                            </Item>
                        </View>

                        <View style={styles.btnView}>
                            <TouchableOpacity onPress={() => signUP()} block style={{ width: '65%', justifyContent: 'center', alignItems: 'center', height: 70, borderRadius: 10, borderWidth: 2, backgroundColor: ThemeColor.mainThmemColor }}>
                                {/* <Icon name="check-circle" size={hp(3)} style={{ color: 'white' }} /> */}
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'white' }}>  Signup</Text>
                            </TouchableOpacity>

                        </View>

                    </Form>
                </View> : <View style={{ height: '100%', width: '100%',justifyContent:'center',alignItems:'center' }}>
                    <Loading />

                    <Text style={{ color: '#ffffff' }}>Image Uploadng...</Text>

                </View>}
        </KeyboardAvoidingView>











    )

}
const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,

    },
    container: {
        flex: 1,
        backgroundColor: '#242f35'
    },
    disp: {

        height: hp(10),
        width: wp(100),
    },

    navigation: {
        width: wp(100),
        // height: hp(10),  //
        padding: hp(3.5)

    },
    textView: {
        width: wp(100),
        height: hp(5),  //
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
        height: hp(40),   //
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: hp(5),
        // paddingRight: wp(10),


    }


})
