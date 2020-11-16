import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { Linking, Platform } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
export default class FAB_Bottom_Left extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }
    dialCall = (number) => {
        let phoneNumber = '';
        phoneNumber = `sms:${number}${Platform.OS === "ios" ? "&" : "?"}body=${""}`

        Linking.openURL(phoneNumber);
    };
    
    render() {

        return (



            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#0079ff' }}
                position="bottomLeft"
                onPress={() => this.dialCall(this.props.vendorNo)}>
                <FeatherIcon name="message-square" />
                {/* <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button> */}
            </Fab>

        );
    }
}