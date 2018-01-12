import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import axios from 'axios';

import { serverLogin } from './Constants';
import styles from './Styles';

class SignIn extends Component {
    state= {
        email: '',
        password: '',
        token:''
    };

    componentDidMount() {
        const myToken =  AsyncStorage.getItem('token')
        }

loginUser = () => {
    axios
      .post(serverLogin, {
          email: this.state.email,
          password: this.state.password,
          token: myToken
      })
      console.log(this.state)
      .then((res) => {
        const token = res.data.token
        if(token) {
            AsyncStorage.setItem('token', token)
              .then((AsyncRes) => {
                  this.props.navigation.navigate('Home')
              })
              .catch((err) => {
                  throw new Error(err)
              })
        }

    })
    .catch((err) => {
        console.log(err)
    })
};

handleEmailChange = (email) => {
    this.setState({ email })
};

handlePasswordChange = (password) => {
    this.setState({ password })
};

    render() {
        return (
            <View style={ styles.container } >
                <Text style={ styles.title }>Sign Up</Text>
                <TextInput 
                  style={styles.inputStyles }
                  name="email"
                  onChangeText={this.handleEmailChange}
                  value={this.state.email}
                  placeholder="email"
                />
                <TextInput
                    style={styles.inputStyles}
                  name="password"
                  onSubmitEditing={this.loginUser}
                  onChangeText={this.handlePasswordChange}
                  value={this.state.password}
                  placeholder="password"
                />
            </View>
        );
    }
}

SignIn.propTypes = {};

export default SignIn