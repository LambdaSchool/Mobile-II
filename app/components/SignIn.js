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

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn () {
    const { email, password } = this.state;
    this.setState({ error: '' });          
    axios.post('https://mobile-server-ii.herokuapp.com/signin', {
      email,
      password
    })
    .then((res) => {
      AsyncStorage.setItem('token', res.data.token)
      .then(() => {
        this.props.navigation.navigate('Content');
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      this.setState({ error: 'Incorrect email or password' })
      console.log(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
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
        <Button
          title='Submit'
          onPress={this.handleSignIn}
        />
      </View>
    );
  }
}