import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, AsyncStorage, KeyboardAvoidingView } from 'react-native';
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
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
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
                        secureTextEntry={true}
                        onChangeText={this.handlePasswordChange}
                        onSubmitEditing={this.handleSubmit}
                        underlineColorAndroid='transparent'
                        placeholder="password"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

export default SignIn;