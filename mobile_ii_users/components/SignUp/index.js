import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import styles from '../Styles';
import axios from 'axios';
const postUrl = 'https://mobile-server-ii.herokuapp.com/users';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confPass: '',
            error: null,
        }
    }
    handleEmailChange = (text) => {
        this.setState({ email: text });
    }

    handlePasswordChange = (text) => {
        this.setState({ password: text });
    }

    handleConfPassChange = (text) => {
        this.setState({ confPass: text });
    }

    handleSubmit = () => {
        if (this.state.password === this.state.confPass) {
            axios.post(postUrl, { email: this.state.email, password: this.state.password })
                .then(res => {
                    // console.log(res.data);
                    AsyncStorage.setItem('JWT', res.data.token);
                    this.props.navigation.navigate('Contents');
                })
                .catch(err => {
                    console.log(err.message);
                    this.setState({
                        error: 'Error on sign up',
                    });
                    setTimeout(() => {
                        this.setState({ error: null })
                    }, 3000);
                });
        } else {
            this.setState({ error: 'The passwords do not match' });
            setTimeout(() => {
                this.setState({ error: null })
            }, 3000);
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <Text style={styles.formHeader}>Please Sign Up Here</Text>
                <Text style={styles.formText}>All fields are required</Text>
                <View style={styles.formWrapper}>
                    <TextInput
                        style={styles.shortInput}
                        keyboardType={'email-address'}
                        onChangeText={this.handleEmailChange}
                        underlineColorAndroid='transparent'
                        placeholder="email"
                    />
                    <TextInput
                        style={styles.shortInput}
                        secureTextEntry={true}
                        onChangeText={this.handlePasswordChange}
                        underlineColorAndroid='transparent'
                        placeholder="password"
                    />
                    <TextInput
                        style={styles.shortInput}
                        secureTextEntry={true}
                        onChangeText={this.handleConfPassChange}
                        onSubmitEditing={this.handleSubmit}
                        underlineColorAndroid='transparent'
                        placeholder="confirm password"
                    />
                </View>
                <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>    
                </TouchableOpacity>
                {this.state.error !== null ? <Text>{this.state.error}</Text> : null}

            </KeyboardAvoidingView>
        );
    }
}

export default SignUp;