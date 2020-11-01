import React from 'react'
import { View, Image } from 'react-native'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ThemeColor } from '../../Constant/index'
export default function CardCarDetail(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Card style={{ width: widthPercentageToDP(90) }}  >
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../../Assets/img/iconSawari.png')} style={{ borderColor: ThemeColor.mainThmemColor, borderWidth: 1 }} />


                        <Body>
                            <Text> Car Details</Text>
                            <Text note> Company:{props.items.CarComapany}</Text>
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
                        <Button success onPress={() => { props.parentFlatlist.refresh_Flatlist(props.items.CarNumber) }}>
                            <Text>ORDER NOW</Text>
                        </Button>
                    </View>
                </CardItem>
            </Card>
        </View>

    )
}
