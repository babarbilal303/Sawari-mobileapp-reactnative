import React, { useState } from 'react'
import { View, Text,Button } from 'react-native'
import Modal from 'react-native-modal';

export default function index() {
    const [isModalVisiable, setisModalVisiable] = useState(false);
    const toggleModal = () => {
        setisModalVisiable(!isModalVisiable)
    }
    return (
        <View>
            <Button title="Show modal" onPress={toggleModal} />
            <Modal isVisible={isModalVisiable} >
                <View style={{ flex: 1 }}>
                    <Text>I am the modal content!</Text>
                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    )
}
