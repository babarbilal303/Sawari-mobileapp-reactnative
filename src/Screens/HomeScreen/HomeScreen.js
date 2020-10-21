import React from 'react'
import { View, Text } from 'react-native'
import HeaderCustom from '../../Components/Header'
import { ThemeColor } from '../../Constant/index'
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    
    return (
        <View style={{ flex: 1 }}>
            <HeaderCustom  />

        </View>
    )
}
