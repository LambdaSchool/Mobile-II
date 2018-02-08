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

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    };
  }

  handleSignUp = () => {
    const url = 'https://mobile-server-ii.herokuapp.com';
    const { email, password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) {
      alert('Passwords not match');
      this.setState({ email: '', password: '', passwordConfirmation: '' });
      return undefined;
    }
    axios.post(`${url}/users`, { email, password })
      .then(res => {
        return AsyncStorage.multiSet([['token', res.data.token], ['currentUser', JSON.stringify(res.data.user)]]);
      })
      .then(() => {
        this.props.navigation.navigate('Content');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={container}>
        <TextInput style={textInput} placeholder="Email" onChangeText={(text) => this.setState({ email: text })} value={this.state.email}/>
        <TextInput secureTextEntry={true} style={textInput} placeholder="Password" onChangeText={(text) => this.setState({ password: text })} value={this.state.password}/>
        <TextInput secureTextEntry={true} style={textInput} placeholder="Password Confirmation" onChangeText={(text) => this.setState({ passwordConfirmation: text })} value={this.state.passwordConfirmation}/>
        <TouchableOpacity style={button} onPress={this.handleSignUp}>
          <Text style={buttonText} >Sign Up</Text>
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
  }
});

const { container, textInput, button, buttonText } = styles;

export default SignUp;