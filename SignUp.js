import React, { Component } from 'react';
import { Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

import styles from './Styles';
import Content from './Content';

const STORAGE_KEY = 'token';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.userSignUp = this.userSignUp.bind(this);
  }

  userSignUp = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('https://mobile-server-ii.herokuapp.com/users', newUser)
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
        console.log('Axios error: ' + err);
      });
  };

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
        <Button title="Submit" onPress={this.userSignUp} />
      </View>
    );
  }
}
