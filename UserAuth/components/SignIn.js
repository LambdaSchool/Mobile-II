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
      password: ''
    };
  }

  handleSignIn = () => {
    const url = 'https://mobile-server-ii.herokuapp.com';
    const { email, password } = this.state;
    axios.post(`${url}/signin`, { email, password })
      .then(res => {
        const token = this.getToken('token');
        const currentUser = this.getUser('currentUser');
        if (!token) return AsyncStorage.setItem('token', res.data.token);
        if (token !== res.data.token) return AsyncStorage.setItem('token', res.data.token);
        if (!currentUser) return AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
        if (currentUser.email !== res.data.user.email) return AsyncStorage.setItem('currentUser', JSON.stringify(res.data.user));
      })
      .then(() => {
        this.props.navigation.navigate('Content');
      })
      .catch(err => console.log(err));
  }

  async getToken(key) {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch(e) {
      console.log(e);
    }
  }

  async getUser(key) {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      return JSON.parse(currentUser);
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={container}>
        <TextInput style={textInput} placeholder="Email" onChangeText={(text) => this.setState({ email: text })} value={this.state.email}/>
        <TextInput secureTextEntry={true} style={textInput} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} value={this.state.password}/>
        <TouchableOpacity style={button} onPress={this.handleSignIn}>
          <Text style={buttonText} >Sign In</Text>
        </TouchableOpacity>
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
    width: '50%'
  },
  button: {
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center'
  }
});

const { container, textInput, button, buttonText } = styles;

export default SignIn;