import React, { Component } from 'react';
import { Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

const STORAGE_KEY = 'token';

import styles from './Styles';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    const { email, password } = this.state;

    axios
      .post('https://mobile-server-ii.herokuapp.com/signin', {
        email,
        password
      })
      .then(res => {
        const token = res.data.token;
        if (token) {
          AsyncStorage.setItem(STORAGE_KEY, token)
            .then(() => {
              this.props.navigation.navigate('Content');
            })
            .catch(err => {
              throw new Error(err);
            });
        }
      })
      .catch(err => {
        console.log('Axios Error: ' + err);
      });
  }

  render() {
    return (
      <View style={styles.formContainer}>
        <Text>Email: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="Email"
        />
        <Text>Password: </Text>
        <TextInput
          style={styles.inputField}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="Password"
        />
        <Button title="Submit" onPress={this.signIn} />
      </View>
    );
  }
}
