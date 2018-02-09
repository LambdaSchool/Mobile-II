import React, { Component } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleSignIn = () => {
    const url = 'https://mobile-server-ii.herokuapp.com';
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Can't be blank" });
      this.setState({ email: '', password: '' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
      return undefined;
    }
    axios.post(`${url}/signin`, { email, password })
      .then(res => {
        const token = this.getToken('token');
        if (!token) AsyncStorage.setItem('token', res.data.token);
        if (token !== res.data.token) AsyncStorage.setItem('token', res.data.token);
        this.setState({ email: '', password: '' });
        this.props.navigation.navigate('Content');
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "Error on Sign In" });
        this.setState({ email: '', password: '' });
        setTimeout(() => {
          this.setState({ error: null });
        }, 2000);
      });
  }

  async getToken(key) {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  }

  async getUser(key) {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      return JSON.parse(currentUser);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={container}>
        <TextInput style={textInput} placeholder="Email" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
        <TextInput secureTextEntry={true} style={textInput} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
        <TouchableOpacity style={button} onPress={this.handleSignIn}>
          <Text style={buttonText} >Sign In</Text>
        </TouchableOpacity>
        {this.state.error ? <Text style={errorText}>{this.state.error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    padding: 5,
    margin: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    width: '70%'
  },
  button: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 20,
    color: 'red'
  }
});

const { container, textInput, button, buttonText, errorText } = styles;

export default SignIn;