import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
const URL = 'https://mobile-server-ii.herokuapp.com';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    };

    handleInputChange = (text, type) => {
        this.setState({ [type]: text });
        console.log('this.state', this.state)
    };

    signUp = () => {
        const { email, password } = this.state;

        axios.post(`${URL}/users`, { email, password })
            .then(response => {
                const { token } = response.data;
                AsyncStorage.setItem('token', token);
                this.props.navigation.navigate('Contents')
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: 'Error on sign up',
                });
                setTimeout(() => {
                    this.setState({ error: null });
                }, 3000);
            });
        this.setState({
            email: '',
            password: ''
        });
    };

    render() {
        return (
            <View style={{ padding: 10 }}>
                <Text style={heading}>Create An Account</Text>
                <TextInput
                    style={inputStyle}
                    placeholder="Enter email address."
                    onChangeText={(text) => this.handleInputChange(text, 'email')}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter password."
                    onChangeText={(text) => this.handleInputChange(text, 'password')}
                />
                <TouchableOpacity style={button}>
                    <Text style={buttonText} onPress={() => alert(this.signUp())}>Sign Up</Text>
                </TouchableOpacity>
                {this.state.error !== null ? <Text style={errorText}> {this.state.error}</Text> : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20
    },
    button: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        height: 60,
        width: 350
    },
    buttonText: {
        fontSize: 20,
        justifyContent: 'center'
    },
    inputStyle: {
        height: 40
    },
    errorText: {
        fontSize: 18,
        color: 'red'
    }

});

const { button, buttonText, inputStyle, heading, errorText } = styles;

export default Signup;