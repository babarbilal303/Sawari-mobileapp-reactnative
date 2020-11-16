import React, { Component } from 'react';
import { Container, Header, View, Button, Icon, Fab } from 'native-base';
import { Linking,Platform } from 'react-native'
export default class FAB_Bottom_Right extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        };
    }
    dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };
    render() {
       
        return (



            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: 'green' }}
                position="bottomRight"
                onPress={() => this.dialCall(this.props.vendorNo)}>
                <Icon name="call" />
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