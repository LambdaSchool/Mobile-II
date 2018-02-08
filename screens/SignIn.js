import React, { Component } from 'react';
import { 
  AsyncStorage,
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  Button 
} from 'react-native';

import axios from 'axios';

class SignIn extends Component {

  state = {
    email: '',
    password: '',
  };

  handleButton = () => {
    
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;

    const endpoint = 'https://mobile-server-ii.herokuapp.com/signin';

    axios
      .post(endpoint, {
        email: email.trim(),
        password,
      })
      .then((res) => {
        
        const { token } = res.data;
        
        if (token) {
          
          AsyncStorage
            .setItem('token', token)
            .then(() => navigate('Content'))
            .catch(() => alert('Unable to save token'));

        }

      })
      .catch(() => alert('Login Error'));

  }
  render() {
    
    return (
      <View>
        
        <Text>SignIp Screen</Text>

        <TextInput underlineColorAndroid='transparent'
          placeholder="Email Address"
          onChangeText={ (email) => this.setState({ email }) }
          value={ this.state.email } />

        <TextInput 
          underlineColorAndroid='transparent' 
          secureTextEntry={ true }
          placeholder="Password"
          onChangeText={ (password) => this.setState({ password }) }
          value={ this.state.password } />

        <Button
          title="Sign In" 
          onPress={ this.handleButton } />

      </View>
    );

  }

}

const styles = StyleSheet.create({

});

export default SignIn;
