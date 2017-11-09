import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red'
  }
});

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp () {
    const { email, password, confirmPassword } = this.state;
    if(password !== confirmPassword){
      this.setState({ error: 'Passwords must match' })      
    } else {
      this.setState({ error: '' });      
      axios.post('https://mobile-server-ii.herokuapp.com/users', {
        email,
        password
      })
      .then((res) => {
        if (res.data.code === 11000) {
          this.setState({ error: 'An account with that email already exists.'});
        }
        AsyncStorage.setItem('token', res.data.token)
        .then(() => {
          this.props.navigation.navigate('Content');
        })
        .catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {!!this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        <Text>Enter your email address:</Text>
        <TextInput 
          onChangeText={(email) => this.setState({ email })} 
          value={this.state.email} 
        />
        <Text>Enter your password:</Text>
        <TextInput 
          onChangeText={(password) => this.setState({ password })} 
          value={this.state.password} 
          secureTextEntry={true}
        />
        <Text>Confirm your password:</Text>
        <TextInput 
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })} 
          value={this.state.confirmPassword} 
          secureTextEntry={true}
        />
        <Button
          title='Submit'
          onPress={this.handleSignUp}
        />
      </View>
    );
  }
}