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
     
            <Header style={{ backgroundColor: '#ffffff', height: hp(8) }}>
                <Left>
                    <Button transparent onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon name='menu' style={{ color: ThemeColor.mainThmemColor }} />
                    </Button>
                </Left>
                <Body >

                    <Image source={require('../Assets/img/logo_black.png')} style={{ width: '90%', height: "85%", marginLeft: '40%' }} />


                </Body>
                <Right />
            </Header>


    );

}