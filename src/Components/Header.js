import React, { Component, useEffect, useState } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ThemeColor } from '../Constant/index'
import { Image, View } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
export default HeaderCustom = () => {
    const navigation = useNavigation();
    return (

        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between', height: hp(8),
                backgroundColor: 'white',
                elevation: 4
                // position: 'absolute', top: 0, left: 0, right: 0, elevation: 4

            }}>
            <Left>
                <View >
                    <Button transparent onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Icon name='menu' style={{ color: ThemeColor.mainThmemColor }} />
                    </Button>
                </View>
            </Left>
            <Body >

                <Image source={require('../Assets/img/logo_black.png')} style={{ width: wp(30), height: hp(7) }} />

            </Body>
            <Right />
        </View>


    );

}