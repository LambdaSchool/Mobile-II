import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';

export default class signUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    signUp = () => {
        const email = this.state.email;
        const password = this.state.password;
        axios.post('https://mobile-server-ii.herokuapp.com/users', {
            email,
            password
        })
        axios.post(`${URL}/users`)
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
                <Button title='Sign up!' onPress={this.signUp} />
                {this.state.error !== null ? <Text>{this.state.error}</Text>: null}
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