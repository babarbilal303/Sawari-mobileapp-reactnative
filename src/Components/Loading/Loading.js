import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Container, Content, Spinner } from 'native-base';


import styles from "./styles";

const Loading = () => {

  return (
    <Container>
      <Content contentContainerStyle={styles.contentStyle} scrollEnabled={false}>

        <View>
          <Spinner color='#05659E' size={"large"} />
        </View>

      </Content>
    </Container>
  );
};

export default Loading;
