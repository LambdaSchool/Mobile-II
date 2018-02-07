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
        this.props.navigation.navigate('Content');
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