import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import Content from './Content';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com/';

class SignUp extends React.Component {
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
            .then(res => {
                AsyncStorage.setItem('token', res.data.token, error => {
                    if(error) {
                        console.log('Error saving JWT: ', error);
                    } else {
                        console.log('yeah BB');
                    }
                })
                .then(() => {
                    this.props.navigation.navigate('Content');
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

const Path = StackNavigator({
    Home : { screen: SignUp },
    Content : { screen: Content },
});

export default Path;