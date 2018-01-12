import React, { Component } from 'react';
import { View, Text, TextInput, AsyncStorage } from 'react-native';
import axios from 'axios';

import { serverURL } from './Constants';
import styles from './Styles';

class SignUp extends Component {
    state= {
        email: '',
        password: '',
    };
    componentDidMount() {
        const myToken =  AsyncStorage.getItem('token')
          .then((response) => {
              console.log(response)
          })
          .catch((err) => {
              console.log(err)
          })
        }

createUser = () => {
    const newUser = {
      email: this.state.email, 
      password: this.state.password
    };
    axios
      .post(serverURL, newUser )
    //   .then((res) => {
    //       const token = res.data.token
    //       if(token) {
    //           AsyncStorage.setItem('token', token)
    //             .then((AsyncRes) => {
    //                 this.props.navigation.navigate('Home')
    //             })
    //             .catch((err) => {
    //                 throw new Error(err)
    //             })
    //       }

    //   })
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
                  onSubmitEditing={this.createUser}
                  onChangeText={this.handlePasswordChange}
                  value={this.state.password}
                  placeholder="password"
                />
            </View>
        );
    }
}

SignUp.propTypes = {};

export default SignUp