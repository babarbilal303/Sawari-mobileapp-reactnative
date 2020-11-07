import React from 'react'
import { View, Image } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ThemeColor } from '../../Constant/index'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveCarDetialsInUser, UpdateCarDetialsVendor } from '../../Redux/Actions/user'
import VendorModal from '../../Components/VendorModal'
import { setModalToggle, ModalTOggleONEDIT, carDetialForEdit } from '../../Redux/Actions/CarModal'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    listenOrientationChange as lor,
    removeOrientationListener as rol,
  } from 'react-native-responsive-screen';


export default function CardCarDetail(props) {
    const navigation = useNavigation();

    const dispatch = useDispatch()
    const carModelVisiable = useSelector((state) => state.CarModal);
    const deleteCarDetails = (userobj) => {
        dispatch(RemoveCarDetialsInUser(userobj))
    }
    updateCarDetails = (userobj) => {
        dispatch(setModalToggle(true));
        dispatch(ModalTOggleONEDIT());
        dispatch(carDetialForEdit(userobj));

    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Card style={{ width: widthPercentageToDP(90) }}  >
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../Assets/img/iconSawari.png')} style={{ borderColor: ThemeColor.mainThmemColor, borderWidth: 1,marginLeft:2 }} />

                        <Body style={{ marginLeft: wp(20) }} >
                         
                          <Text style={{fontFamily:'CrashLandingBB',fontSize:30}}> Car Details</Text>
                            <Text  note> Company:{props.items.CarComapany}</Text>
                            <Text note> Name:{props.items.CarName}</Text>
                            <Text note> Number:{props.items.CarNumber}</Text>
                            <Text note> Model:{props.items.CarModel}</Text>
                            <Text note> Color:{props.items.CarColor}</Text>
                            <Text note> Perday Charges:{props.items.PerDay}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{ uri: 'https://cache2.pakwheels.com/system/car_generation_pictures/5260/original/alto.jpg?1595597920' }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ justifyContent: 'flex-end' }}>

                    <View>
                        {/* <Button success onPress={() => { props.parentFlatlist.refresh_Flatlist(props.items.CarNumber) }}>
                            <Text>Edit</Text>
                        </Button> */}
                        <Button success onPress={() => { updateCarDetails(props.items) }}>
                            <Text>Edit</Text>
                        </Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button danger onPress={() => deleteCarDetails(props.items)} >
                            <Text>Delete</Text>
                        </Button>
                    </View>
                </CardItem>
            </Card>
        </View>

    )
}
