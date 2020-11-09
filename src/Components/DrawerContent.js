import React, { useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import {
    useTheme,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { ThemeColor } from '../Constant/index'
import { useNavigation, StackActions, CommonActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, UpdateUserProfile } from '../Redux/Actions/user'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Auth, storage } from '../../Setup'
import AsyncStorage from '@react-native-community/async-storage';
import { Avatar, Accessory, Divider } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';

export function DrawerContent(props) {

    const [SelectedImageUrl, setSelectedImageUrl] = useState('')
    const [DownloadImage, setDownloadImage] = useState('')
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const logOut = () => {
        // navigation.dispatch(
        //     CommonActions.reset({
        //       index: 1,
        //       routes: [
        //         { name: 'welcome' },  
        //       ],
        //     })
        //   );
        // navigation.dispatch(StackActions.popToTop());
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'welcome' }],
        // });
        //   navigation.dispatch(StackActions.replace("welcome"))
        dispatch(setUsername(null))
        AsyncStorage.clear();
        Auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.dispatch(StackActions.replace("welcome"))

                // navigation.reset("welcome")
            })



    }


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



            storage().ref("profile-picture/" + user.email).putFile(SelectedImageUrl).then(res => {
                console.log('storege workinng')
                storage().ref("profile-picture/" + user.email).getDownloadURL().then(url => {
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
                    dispatch(UpdateUserProfile(url));
                    console.log("download Image in State: ", DownloadImage, url)

                }).catch(err => {

                    alert(err)
                })
            }).catch(err => {
                alert(err)
            })

        }


    }
    console.log(user, "user store")
    console.log("download Image in State: ", DownloadImage)
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <DrawerContentScrollView {...props}  >
                <View style={styles.drawerContent}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around', paddingVertical: '4%' }}>


                            <Avatar

                                renderPlaceholderContent={<ActivityIndicator />}
                                onPress={() => ImageHandler()}
                                avatarStyle={{ borderColor: ThemeColor.mainThmemColor, borderWidth: 2 }}
                                size={"medium"}
                                overlayContainerStyle={{ backgroundColor: 'white' }}
                                rounded

                                source={{

                                    uri: user ? user.profile_url ? user.profile_url : "https://www.w3schools.com/howto/img_avatar2.png" : "https://www.w3schools.com/howto/img_avatar2.png"
                                }}
                            >
                                <Accessory />
                            </Avatar>
                            <View >
                                <Title style={{ ...styles.title }}>{user ? user.Name : ''}</Title>

                            </View>

                            <Image source={require('../Assets/img/logo_black.png')} style={{ width: '30%', height: "100%" }} />

                        </View>
                        <Divider style={{ backgroundColor: ThemeColor.mainThmemColor, height: 2 }} />
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={ThemeColor.mainThmemColor}
                                    size={30}
                                />
                            )}
                            labelStyle={{ color: ThemeColor.mainThmemColor, fontSize: 15, fontWeight: "bold" }}
                            style={{ borderColor: '#000000', borderBottomWidth: 2 }}
                            label="Home"
                            onPress={() => {
                                props.navigation.navigate('home')

                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="account-outline"
                                    color={ThemeColor.mainThmemColor}
                                    size={30}
                                />
                            )}
                            labelStyle={{ color: ThemeColor.mainThmemColor, fontSize: 15, fontWeight: "bold" }}
                            style={{ borderColor: '#000000', borderBottomWidth: 2 }}
                            label="Contact Us"



                            onPress={() => { props.navigation.navigate('loginScreen') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="exit-to-app"
                                    color={ThemeColor.mainThmemColor}
                                    size={30}
                                />
                            )}
                            style={{ borderColor: '#000000', borderBottomWidth: 2 }}
                            labelStyle={{ color: ThemeColor.mainThmemColor, fontSize: 15, fontWeight: "bold" }}
                            label="Logout"
                            onPress={() => { logOut() }}
                        />

                    </Drawer.Section>



                </View>
            </DrawerContentScrollView>

            <Drawer.Section>
                <View style={styles.continerPakistan} >
                    <View >
                        <Icon name="heart" size={20} style={{ color: ThemeColor.mainThmemColor }} />

                    </View>
                    <View >
                        <Text>
                            {" "}   Made {" "}
                        </Text>
                    </View>

                    <View >
                        <Text > in </Text>
                    </View>

                    <View>
                        <Image
                            source={require("../Assets/Flag.png")}
                        />
                    </View>
                </View>
            </Drawer.Section>

        </View>
    );
}

const styles = StyleSheet.create({
    continerPakistan: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerContent: {
        flex: 1,


    },

    title: {
        fontSize: 35,
        marginTop: 3,
        marginRight: 20,

        color: ThemeColor.mainThmemColor,
        fontFamily: 'CrashLandingBB'

    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#ffffff'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },

});
