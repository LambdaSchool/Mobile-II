import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native';
import axios from 'axios';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com';

export default class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleButtonSubmit() {
        console.log('test101'); //works
        const email = this.state.email;
        const password = this.state.password;
        axios
            .post(`${ROOT_URL}/signin`, { email, password })
            .then(res => {
                AsyncStorage.setItem('token', res.data.token)
                .then((response) => {
                    console.log('successful login');
                    this.props.navigation.navigate('Content');
                })
                .catch(error => {
                    console.log('Error saving JWT: ', error);
                })
            })
            .catch(error => {
                console.log('Error signing in: ', error);
            });

    }

    render () {
        return (
            <View>
                <Text>Log In Screen</Text>
                <TextInput onChangeText={(text) => this.setState({ email: text })} placeholder = 'Enter Your Email Address' />
                <TextInput onChangeText={(text) => this.setState({ password: text })} placeholder = 'Enter Your Password' />
                <Button onPress={this.handleButtonSubmit.bind(this)} title='Sign In' />
            </View>
        );
    }
}