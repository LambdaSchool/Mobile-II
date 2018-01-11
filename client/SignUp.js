import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import axios from 'axios';

import styles from './Styles';

export default class SignUp extends React.Component {
  state = {
    email: '',
    password: ''
  };
  handleSubmit = () => {
    const user = { 
      email: this.state.email,
      password: this.state.password
    };
    this.setState({ email: '', password: ''});
    axios.post('https://mobile-server-ii.herokuapp.com/users', user)
      .then(res => {
          const token = res.data.token;
          AsyncStorage.setItem('token', token)
            .then(() => {
              this.props.navigation.navigate('Content');
            })
            .catch(err => console.log(err));      
        }
      )
      .catch(err => console.log(err));
    ;
  }
  handleEmailChange = email => {
    this.setState({ email });
  }
  handlePasswordChange = password => {
    this.setState({ password });
  }
  render () {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholderTextColor={'#fff'}
          onChangeText={this.handleEmailChange}
          value={this.state.email}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          placeholderTextColor={'#fff'}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.navbtn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.navbtntext}> Sign Up! </Text>
        </TouchableOpacity>
      </View>
    );
  }
}