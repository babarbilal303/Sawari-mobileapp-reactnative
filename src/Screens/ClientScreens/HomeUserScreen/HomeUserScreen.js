import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, Alert,BackHandler } from 'react-native'
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor,
    removeOrientationListener as rol
} from 'react-native-responsive-screen';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Auth } from '../../../../Setup'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername } from '../../../Redux/Actions/user'
import AsyncStorage from '@react-native-community/async-storage';
import HeaderCustom from '../../../Components/Header'
import { Container, Header, Tab, Tabs, TabHeading, Icon } from 'native-base';
import { ThemeColor } from '../../../Constant';
import SearchBar from '../../../Components/Search'
import { getAllDetails } from '../../../Redux/Actions/VendorDetails'
import { DETAILS } from '../../../Redux/Actions/ActionTypes';
import SecondUserScreen from '../../../Components/SecondUserScreen/index.js'


export default function HomeUserScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [Alldetails, setAlldetails] = useState([])
    const alldetails = useSelector(state => state.VendorDetialsReducer);

  

    useEffect(() => {
        async function dispatchAndGetData() {
            await dispatch(getAllDetails());
            console.log("details Object.values", Object.values(alldetails));
            const allDetailsValue = Object.values(alldetails);

            setAlldetails([...allDetailsValue]);
        }
        dispatchAndGetData();

    }, [])
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    
        }
      }, []);
    
    
      const handleBackButton = () => {
        Alert.alert(
          'Exit App',
          'Are you sure you want to exit?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()
          },], {
          cancelable: false
        }
        )
        return true;
      }
    return (
        <View style={{ flex: 1 }}>


            <HeaderCustom />
            <Tabs tabBarUnderlineStyle={{ backgroundColor: ThemeColor.mainThmemColor }}  >
                <Tab heading={<TabHeading style={{ backgroundColor: '#ffffff' }}><Icon name="search" style={{ color: ThemeColor.mainThmemColor }} /><Text style={{ color: ThemeColor.mainThmemColor }}>Search</Text></TabHeading>}>
                    {/* <Text style={{ color: ThemeColor.mainThmemColor }}>Search</Text> */}
                    <SearchBar />
                </Tab>
                <Tab heading={<TabHeading style={{ backgroundColor: '#ffffff' }}><Icon name="home" style={{ color: ThemeColor.mainThmemColor }} /><Text style={{ color: ThemeColor.mainThmemColor }}>Home</Text></TabHeading>}>
                    <SecondUserScreen />
                </Tab>
                <Tab heading={<TabHeading style={{ backgroundColor: '#ffffff' }}><Icon name="apps" style={{ color: ThemeColor.mainThmemColor }} /><Text style={{ color: ThemeColor.mainThmemColor }}>Camera</Text></TabHeading>}>
                    <Text>babar`=3</Text>
                </Tab>
            </Tabs>
        </View>



    )
}
const styles = StyleSheet.create({
    View1: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'red'

    },
    View2: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'green'

    },
    View3: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'yellow'

    },
    View4: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'blue'

    },
    View5: {
        height: hp(20),
        width: wp(100),
        backgroundColor: 'purple'

    },

})
