import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  AsyncStorage,
  Text } from 'react-native';
import axios from 'axios';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {email: '', password: '', passwordConfirm: ''};
  }

  signUp = async () => {
    try {
      if(this.state.password !== this.state.passwordConfirm) {
        return this.setState({error: 'Passwords do not match'});
      }
      const res = await axios.post('https://mobile-server-ii.herokuapp.com/users', {
        email: this.state.email,
        password: this.state.password
      });
      if(res.data.code === 11000) {
        return this.setState({error: 'Email already exists'});
      }
      await AsyncStorage.setItem('token', res.data.token);
      this.props.navigation.navigate('Content');
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <View style={styles.container} >
        <Text>Sign Up</Text>
        <Text>{this.state.error ? this.state.error : null}</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          value={this.state.email} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password} />
        <TextInput
          style={styles.textInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
          value={this.state.passwordConfirm} />
        <Button
          title="Sign Up"
          onPress={this.signUp} 
          />
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
  textInput: {
    height: 25,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5
  }
});