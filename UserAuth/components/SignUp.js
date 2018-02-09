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
      passwordConfirmation: '',
      error: null
    };
  }

  handleSignUp = () => {
    const url = 'https://mobile-server-ii.herokuapp.com';
    const { email, password, passwordConfirmation } = this.state;
    if (password !== passwordConfirmation) {
      this.setState({ error: 'Passwords not match' });
      this.setState({ email: '', password: '', passwordConfirmation: '' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
      return undefined;
    } else if (!email || !password || !passwordConfirmation) {
      this.setState({ error: "Can't be blank" });
      this.setState({ email: '', password: '', passwordConfirmation: '' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
      return undefined;
    }
    axios.post(`${url}/users`, { email, password })
      .then(res => {
        AsyncStorage.setItem('token', res.data.token, err);
        this.props.navigation.navigate('Content');
      })
      .catch(err => {
        this.setState({ error: 'Error on Sign Up' });
        setTimeout(() => {
          this.setState({ error: null });
        }, 2000);
      });
  }

  render() {
    return (
      <View style={container}>
        <TextInput 
          style={textInput} 
          placeholder="Email" 
          onChangeText={(text) => this.setState({ email: text })} 
          value={this.state.email}
        />
        <TextInput 
          secureTextEntry={true} 
          style={textInput} 
          placeholder="Password" 
          onChangeText={(text) => this.setState({ password: text })} 
          value={this.state.password}
        />
        <TextInput 
          secureTextEntry={true} 
          style={textInput} 
          placeholder="Password Confirmation" 
          onChangeText={(text) => this.setState({ passwordConfirmation: text })} 
          value={this.state.passwordConfirmation}
        />
        <TouchableOpacity style={button} onPress={this.handleSignUp}>
          <Text style={buttonText} >Sign Up</Text>
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

export default SignUp;