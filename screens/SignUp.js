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

class SignUp extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  handleButton = () => {
    
    const { email, password, confirmPassword } = this.state;
    const { navigate } = this.props.navigation;

    if (password === confirmPassword) {

      const endpoint = 'https://mobile-server-ii.herokuapp.com/users';

      axios
        .post(endpoint, {
          email: email.trim(),
          password,
        })
        .then((res) => {

          const { token } = res.data;

          if (token) {

            AsyncStorage.setItem('token', token)
              .then(() => navigate('Content'))
              .catch(() => navigate('Home'));

          }

        })
        .catch((err) => {
          console.log(err);
        });

    } else {

      alert('Passwords didn\'t match');

      this.setState({
        password: '',
        confirmPassword: ''
      });

    }

  }

  render() {
    
    return (
      <View>
        
        <Text>SignUp Screen</Text>

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

        <TextInput
          underlineColorAndroid='transparent' 
          secureTextEntry={ true }
          placeholder="Retype Password"
          onChangeText={ (confirmPassword) => this.setState({ confirmPassword }) }
          value={ this.state.confirmPassword } />

        <Button 
          title="Sign Up" 
          onPress={ this.handleButton } />

      </View>
    );

  }

}

const styles = StyleSheet.create({

});

export default SignUp;
