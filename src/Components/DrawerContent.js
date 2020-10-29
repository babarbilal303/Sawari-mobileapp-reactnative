import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    useTheme,
    Avatar,
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
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { setUsername } from '../Redux/Actions/user'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Auth } from '../../Setup'

export function DrawerContent(props) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const logOut = () => {
        dispatch(setUsername(null))
        Auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        navigation.navigate('welcome')
    }
    console.log(user,"user store")
    return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <DrawerContentScrollView {...props}  >
                <View style={styles.drawerContent}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around', paddingVertical: '4%' }}>

                            <Image source={require('../Assets/img/logo_black.png')} style={{ width: '30%', height: "100%" }} />

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{user ? user.name : ''}</Title>

                            </View>
                        </View>

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
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: ThemeColor.mainThmemColor
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
