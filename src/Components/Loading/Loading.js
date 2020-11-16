import React, { useState, useEffect } from 'react';
import { Text, View,Image } from 'react-native';
import { Container, Content, Spinner } from 'native-base';


import styles from "./styles";

const Loading = () => {

  return (
    
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          {/* <Spinner color='#05659E' size={"large"} /> */}
          <View >
          <Image source={require('../../Assets/sawari_preloader/Sawari_preloader.gif')} style={{width: 70, height:70 }}  />


          </View>
        </View>

    
  );
};

export default Loading;
