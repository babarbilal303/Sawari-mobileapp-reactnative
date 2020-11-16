
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { Container, DeckSwiper, Card, CardItem, Thumbnail, Fab, Text, Left, Body, Icon, Button } from 'native-base';
import { ThemeColor } from '../../../Constant/index'
import Header from '../../../Components/Header'
import { Avatar, Accessory, Divider } from 'react-native-elements';
import FAB_Bottom_Right from '../../../Components/Fabs/FAB_Bottom_Right'
import FAB_Bottom_Left from '../../../Components/Fabs/FAB_Bottom_Left'
export default function VendorDetailsModal({ route }) {

    const [VendorCarsDetails, setVendorCarsDetails] = useState([])
    const [VendorInfo, setVendorInfo] = useState({})

    useEffect(() => {
        const { VendorDetails } = route.params;
        console.log('vendor navu', VendorDetails)
        setVendorInfo({ ...VendorDetails })
        console.log('vendor info', VendorDetails)
        if (VendorDetails.carDetials) {
            let VenderDetailsDescribe = Object.values(VendorDetails.carDetials)
            console.log('vendor carde', VenderDetailsDescribe)
            setVendorCarsDetails([...VenderDetailsDescribe]);
        }
    }, [])
    console.log('vendor steate', VendorCarsDetails)

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>

            <Header />


            <View style={{ height: hp(16) }}>
                <View style={{ backgroundColor: ThemeColor.mainThmemColor, height: hp(10), width: wp(100) }}>


                    <View>



                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ height: hp(3) }} />
                            <Avatar

                                size="large"

                                source={{
                                    uri: VendorInfo.Profle_Pic ? VendorInfo.Profle_Pic :
                                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                                }}
                                containerStyle={{ width: wp(25), height: hp(12),borderColor:ThemeColor.contrasThemeColor,borderWidth:5 }}

                            />
                            <View>
                                <Text style={{ fontFamily: 'CrashLandingBB', fontSize: 80, paddingLeft: wp(20), color: "#ffffff" }}>{VendorInfo.Area} </Text>

                            </View>
                            <View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'CrashLandingBB', fontSize: 30, marginLeft: 25 }}> {VendorInfo.Name}</Text>
                    </View>


                </View>

            </View>

            <View style={{ height: hp(86) }}>
                {/* <Text style={{ fontFamily: 'CrashLandingBB', fontSize: 40 }}> CarS Details</Text> */}

                <FlatList
                    // extraData={refresh} //for update a flat list

                    data={VendorCarsDetails}
                    keyExtractor={(item, index) => item.Id}
                    renderItem={({ item, index }) => {

                        return (<Card style={{ width: wp(90) }}  >
                            <CardItem style={{ backgroundColor: ThemeColor.contrasThemeColor }} >
                                <Left>
                                    <Thumbnail source={require('.././../../Assets/img/iconSawari.png')} style={{ borderColor: ThemeColor.mainThmemColor, borderWidth: 1, marginLeft: 2 }} />

                                    <Body style={{ marginLeft: 20 }}  >


                                        <Text style={{ color: '#ffffff' }} > Company:{item.CarComapany}</Text>
                                        <Text style={{ color: '#ffffff' }}> Name:{item.CarName}</Text>
                                        <Text style={{ color: '#ffffff' }}> Number:{item.CarNumber}</Text>
                                        <Text style={{ color: '#ffffff' }} > Model:{item.CarModel}</Text>
                                        <Text style={{ color: '#ffffff' }} > Color:{item.CarColor}</Text>
                                        <Text style={{ color: '#ffffff' }} > Perday Charges:{item.PerDay}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Image source={{ uri: 'https://cache2.pakwheels.com/system/car_generation_pictures/5260/original/alto.jpg?1595597920' }} style={{ height: 200, width: null, flex: 1 }} />
                            </CardItem>
                            <CardItem style={{ justifyContent: 'flex-end' }}>


                            </CardItem>
                        </Card>
                        )

                    }}

                />
            </View>
            <FAB_Bottom_Left vendorNo={VendorInfo.PhoneNuber} />
            <FAB_Bottom_Right vendorNo={VendorInfo.PhoneNuber} />






        </View>

    )
}