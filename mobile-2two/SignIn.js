import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput,
  AsyncStorage,} 
from 'react-native';
import axios from 'axios';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  
  handlePress() {
    axios.post('https://mobile-server-ii.herokuapp.com/signin', {email: this.state.email, password: this.state.password}).then((response) => {
    if (response.data.code === 11000) {
      return this.setState({
        error: 'Email is already in use'
      });
    }
     AsyncStorage.setItem('token', response.data.token).then(() => {
      this.props.navigation.navigate('Content');
      }); 
    }).catch((error) => {
     console.log(error);
   });
  }
  
  render() {
    return (
      <View>
        <View>
          <Text>Please enter your email and choose a password</Text>
        </View>
        <View>
          <TextInput onChangeText={(email) => {this.setState({ email })}}
          value={this.state.email}  />
          <TextInput onChangeText={(password) => {this.setState({ password })}}
          value={this.state.password}  />
        </View>
        <View>
          <Button 
            title='Sign In' 
            onPress={() => this.handlePress()}  />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
