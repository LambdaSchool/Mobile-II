import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import styles from '../Styles';
import axios from 'axios';
const postUrl = 'https://mobile-server-ii.herokuapp.com/signin';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        }
    }
    handleEmailChange = (text) => {
        this.setState({ email: text });
    }

    handlePasswordChange = (text) => {
        this.setState({ password: text });
    }

    handleSubmit = () => {
        axios.post(postUrl, { email: this.state.email, password: this.state.password })
            .then(res => {
                // console.log(res.data);
                AsyncStorage.setItem('JWT', res.data.token);
                this.props.navigation.navigate('Contents');
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.formHeader}>Please sign in</Text>
                <View style={styles.formWrapper}>
                    <TextInput
                        style={styles.shortInput}
                        onChangeText={this.handleEmailChange}
                        underlineColorAndroid='transparent'
                        placeholder="email"
                    />
                    <TextInput
                        style={styles.shortInput}
                        onChangeText={this.handlePasswordChange}
                        underlineColorAndroid='transparent'
                        placeholder="password"
                    />
                </View>
                <Button title='Sign In' onPress={this.handleSubmit} />
            </View>
        );
    }
}

export default SignIn;