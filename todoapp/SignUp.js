import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native';
import axios from 'axios';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com/';

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };
    }


    handleFormSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        axios
            .post(`${ROOT_URL}/users`, { email, password })
            .then(jwt => {
                AsyncStorage.setItem('authorization', JSON.stringify(jwt), error => {
                    if(error) {
                        console.log('Error saving JWT: ', error);
                    } else {
                        console.log('yeah BB');
                    }
                });

            })
            .catch(error => {
                console.log('Error saving User to DB: ', error);
            });

    };

    render () {
        return (
            <View>
                <Text>Sign Up Screen</Text>
                <TextInput onChangeText={(text) => this.setState({ email: text}) } placeholder = 'Enter Your Email Address' />
                <TextInput onChangeText={(text) => this.setState({ password: text }) } placeholder = 'Enter Your Password' />
                <Button onPress={(event) => this.handleFormSubmit} title='Create Account' />
            </View>
        );
    }
}