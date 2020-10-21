import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ThemeColor } from '../Constant/index'
import { Image, View } from 'react-native'

export default HeaderCustom = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <Header style={{ backgroundColor: '#ffffff', height: '45%' }}>
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

        </Container>
    );

}