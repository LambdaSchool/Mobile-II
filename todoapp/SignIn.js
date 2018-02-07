import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

export default class SignIn extends React.Component {
    render () {
        return (
            <View>
                <Text>Log In Screen</Text>
                <TextInput onChangeText={() => {console.log('yay')}} placeholder = 'Enter Your Email Address' />
                <TextInput onChangeText={() => {console.log('yayay')}} placeholder = 'Enter Your Password' />
                <Button onPress={() =>  console.log('booya')} title='Sign In' />
            </View>
        );
    }
}