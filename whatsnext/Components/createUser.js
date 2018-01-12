import React from 'react';
import {Text, View, TextInput, Button, Dimensions, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../Styles/home'
import { serverUrl } from '../constants';
import axios from 'axios';

import CatPage from '../Components/catPage';
import Post from '../Components/Post';
export default class CreateUser extends React.Component{
  state ={
    email: '',
    password:''
  }
  createUser = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post(serverUrl, newUser)
    .then(res => {
      const token = res.data.token;
      if ( token) {
        AsyncStorage.setItem('token', token)
          .then(AsyncRes =>{
            // route to cat page
            this.props.navigation.navigate('Post');
          })
          .catch(err =>{
            throw new Error(err);
          });
      };
    })
    .catch(err => {
      console.log(err);
    })
  };
  handleEmailChange = (email) => {
    this.setState({ email });
  };
  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.createUserMessage}> Enter a Email and Password </Text>
        <Text>{"\n"}</Text>
        <View style={styles.login2}>
          <Text>Email</Text>
          <TextInput 
            style={styles.textBox} 
            underlineColorAndroid='transparent'
            onChangeText={this.handleEmailChange}
            value={this.state.email}
          />
          <Text>Passsword</Text>
          <TextInput 
            style={styles.textBox} 
            underlineColorAndroid='transparent'
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
          />
          <Text>{"\n"}</Text>
          <Button title = 'Submit' style={styles.buttonStyle} onPress={this.createUser}/>
        </View>
      </View>
    );
  };
};