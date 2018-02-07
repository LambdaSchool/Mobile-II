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

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleButtonSubmit() {
        console.log('test')
        const email = this.state.email;
        const password = this.state.password;
        axios
            .post(`${ROOT_URL}/users`, { email, password })
            .then(res => {
                console.log('test2')
                AsyncStorage.setItem('token', res.data.token)
                .then(() => {
                    console.log('test3');
                    this.props.navigation.navigate('Content');
                })
                .catch(error => console.log('Problem saving token: ', error))
            })
            .catch(error => {
                if (error) console.log('Error: ', error);
            });
    };

    render () {
        return (
            <View>
                <Text>Sign Up Screen</Text>
                <TextInput onChangeText={(text) => this.setState({ email: text}) } placeholder = 'Enter Your Email Address' />
                <TextInput onChangeText={(text) => this.setState({ password: text }) } placeholder = 'Enter Your Password' />
                <Button onPress={this.handleButtonSubmit.bind(this)} title='Create Account' />
            </View>
        );
    }
}

export default SignUp;