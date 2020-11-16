import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { ThemeColor } from '../../Constant';
import { useDispatch, useSelector } from 'react-redux'
import { ListItem, Avatar } from 'react-native-elements'
import VendorDetailsModal from '../../Components/VendorDetailsModal'
import { getAllDetails } from '../../Redux/Actions/VendorDetails'
import { useNavigation } from '@react-navigation/native';

export default function index() {
    const [search, setsearch] = useState('');
    const dispatch = useDispatch();
    const [Alldetails, setAlldetails] = useState([])
    const [ArrayHolder, setArrayHolder] = useState([])
    const navigation = useNavigation();

    const alldetails = useSelector(state => state.VendorDetialsReducer);
    useEffect(() => {
        async function dispatchAndGetData() {
            await dispatch(getAllDetails());
            console.log("details Object.values", Object.values(alldetails));
            let allDetailsValue = Object.values(alldetails);
            let dataArray = [];
            dataArray.push(...allDetailsValue);
            console.log("dataArray", dataArray);
            let filterVendorOnly = dataArray.filter((data) => {

                console.log(data, "data . Role")
                return data.Role == "vendor"
            })
            console.log("filterVendorOnly", filterVendorOnly);

            setAlldetails(filterVendorOnly);
            setArrayHolder(filterVendorOnly);

            // setAlldetails([...allDetailsValue]);
            // setArrayHolder([...allDetailsValue]);
        }
        dispatchAndGetData();

    }, [])
    console.log(Alldetails, "details", ArrayHolder)


    const searchFilterFunction = (text) => {
        setsearch(text);
        console.log("text", text)
        const newData = ArrayHolder.filter((item) => {
            // const itemData = `${item.name.title.toUpperCase()}   
            // ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
            const itemData = `${item.Name.toUpperCase()}`;
            const textData = text.toUpperCase();
            console.log(itemData, "itemdatasssss")
            return itemData.indexOf(textData) > -1;
        })
        setAlldetails(newData);
    }
    return (
        <>
            <SearchBar
                lightTheme={true}
                containerStyle={{ backgroundColor: '#ffffff' }}
                inputContainerStyle={{ backgroundColor: '#ffffff' }}
                placeholder="Type Here..."
                onChangeText={(text) => searchFilterFunction(text)}
                autoCorrect={false}
                value={search}


            />
            <FlatList
                data={Alldetails}

                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("VendorDetailsScreen", {
                            VendorDetails: item
                        })}
                        style={{ backgroundColor: ThemeColor.mainThmemColor }}
                        activeOpacity={0.2}  >
                        <ListItem
                            containerStyle={{ borderColor: '#000000', borderWidth: 1 }}
                        >
                            <ListItem.Content>
                                <ListItem.Title>{item.Name}</ListItem.Title>
                                <ListItem.Subtitle>{item.Email}</ListItem.Subtitle>
                                <ListItem.Subtitle>{item.PhoneNuber}</ListItem.Subtitle>
                                <ListItem.Subtitle>{item.Area}</ListItem.Subtitle>

                            </ListItem.Content>
                            <ListItem.Chevron />




                        </ListItem>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.Id}
            // ItemSeparatorComponent={this.renderSeparator}
            // ListHeaderComponent={this.renderHeader}
            />

        </>

    )
}
