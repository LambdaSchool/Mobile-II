import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';

export default class signIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    signIn = () => {
        const email = this.state.email;
        const password = this.state.password;
        axios.post('https://mobile-server-ii.herokuapp.com/users', {
            email,
            password
        })
            .then(function (response) {
                console.log(response);
                AsyncStorage.setItem('token', response.data.token).then(() => {
                    this.props.navigation.navigate('Content');
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <View>
                <TextInput onChangeText={(email) => this.setState({ email })} value={this.state.email} placeholder='enter email' />
                <TextInput onChangeText={(password) => this.setState({ password })} value={this.state.password} placeholder='enter password' />
                <Button title='Sign in!' onPress={this.signIn} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});