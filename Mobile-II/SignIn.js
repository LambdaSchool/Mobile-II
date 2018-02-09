import React, { Component }from 'react';
import {
    View,
    Text,
    TextInput,
    AsyncStorage
} from 'react-native';

const axios = require('axios');

import styles from './Styles';
import { serverUrl } from './constants';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        const myToken = AsyncStorage.getItem('token')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleEmailChange = email => {
        this.setState({ email });
    };

    handlePasswordChange = password => {
        this.setState({ password });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Sign In</Text>
                <TextInput
                    style={styles.inputStyles}
                    name="email"
                    onSubmitEditing={this.createUser}
                    onChangeText={this.handlePasswordChange}
                    value={this.state.password}
                    placeholder="password"
                />
            </View>
        );
    }
}

export default SignIn;
