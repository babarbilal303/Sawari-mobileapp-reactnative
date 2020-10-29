import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import { Button } from 'react-native-paper';
navigator.geolocation = require('@react-native-community/geolocation');
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';

import Icon3 from 'react-native-vector-icons/AntDesign'
import Icon4 from 'react-native-vector-icons/MaterialIcons'

import { PermissionsAndroid } from 'react-native';

export default class MapScreen extends Component {


    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            coordinates: [],
            destination: '',

        }

    }


    componentDidMount() {
        try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'This App needs access to your location ' +
                        'so we can know where you are.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use locations ")
            } else {
                console.log("Location permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
        Geolocation.getCurrentPosition(info => console.log("currentloaction", info));
        navigator.geolocation.getCurrentPosition(position => {

            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                coordinates: this.state.coordinates.concat({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error: null

            });
        },
            error => this.setState({ error: error.message }),
            { showLocationDialog: true, enableHighAccuracy: false, timeout: 10000 }
        )
    }


    CurrentLocation = () => {
        Geolocation.getCurrentPosition(info => console.log("currentloaction", info));
        navigator.geolocation.getCurrentPosition(position => {

            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                coordinates: this.state.coordinates.concat({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error: null

            });
        },
            error => this.setState({ error: error.message }),
            { showLocationDialog: true, enableHighAccuracy: false, timeout: 10, maximumAge: 100 }
        )



    }
    changeScreen = () => {
        this.props.navigation.navigate('home')

    }
    render() {

        console.log(this.props.route, "rout")

        return (



            <View style={styles.container} >
                <View style={styles.mapContainer}>

                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }}
                    >


                        <Polyline
                            coordinates={this.state.coordinates}
                            strokeColor="#bf8221"
                            strokeColors={['#bf8221', '#ffe066', '#ffe066', '#ffe066', '#ffe066',]}
                            strokeWidth={3}
                        />

                        <Marker
                            // coordinate={{
                            //   latitude: this.state.latitude,
                            //   longitude: this.state.longitude,
                            // }}>  OR 
                            coordinate={this.state}
                            title="Current Location"
                            description="here iam"
                            // image={require('../../Assets/img/sawariMarker.png')}
                         
                            resizeMode="resize"
                        >

                            <View >
                                <Image source={require('../../Assets/img/sawariMarker.png')} style={{ height: hp(7), width: wp(12) }} />
                            </View>

                        </Marker>



                    </MapView>


                </View>

                <View style={styles.inputView}>
                    <View style={{ height: hp(1) }} />

                    <View style={{ height: hp(5), width: wp(100), marginHorizontal: hp(4) }}>
                        <Text>Your Current Location:</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.props.route.params.UserName} </Text>
                            <Icon3 name="down" color="#fa4930" size={20} />
                        </View>

                    </View>

                </View>



                <View style={{ height: hp(60) }} />


                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>



                    <View style={{ height: hp(9), width: wp(15) }}>

                    </View>


                    <TouchableOpacity onPress={() => this.CurrentLocation()} >

                        <View style={{ height: hp(9), width: wp(15), borderRadius: hp(50), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>

                            <Icon4 name="my-location" size={30} />

                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        position: 'absolute',
                        top: '93%',
                        alignSelf: 'center',

                    }}
                >

                    <Button onPress={() => this.changeScreen()} style={{ width: wp(100), backgroundColor: '#fa4930', height: hp(7), justifyContent: 'center', alignItems: 'center' }}>  <Text style={{ fontSize: 20, color: 'white' }}>NEXT</Text></Button>
                </View>

            </View>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: hp(100),
        width: wp(100)

    },

    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: hp(100),
        width: wp(100),


    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    inputView: {
        width: wp(100),
        height: hp(10),
        backgroundColor: 'white',





    }
});