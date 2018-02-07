import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button
} from 'react-native';
import axios from 'axios';

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        };
    }


    handleFormSubmit(event) {
        event.preventDefault();
        axios
            .post('/users', {})
    }

    render () {
        return (
            <View>
                <Text>Sign Up Screen</Text>
                <TextInput onChangeText={(text) => this.setState({ username: text}) } placeholder = 'Enter Your Email Address' />
                <TextInput onChangeText={(text) => this.setState({ password: text }) } placeholder = 'Enter Your Password' />
                <Button onPress={() =>  console.log('booya')} title='Create Account' />
            </View>
        );
    }
}