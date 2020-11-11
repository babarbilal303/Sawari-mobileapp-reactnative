import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { ThemeColor } from '../../Constant';

export default function index() {
    const [search, setSearch] = useState("")
    return (
        <SearchBar 
        lightTheme={true}
        containerStyle={{backgroundColor:'#ffffff'}}
        inputContainerStyle={{backgroundColor:'#ffffff'}}
            placeholder="Type Here..."
            onChangeText={(text) => setSearch(text)}
            value={search}
        />
    )
}
