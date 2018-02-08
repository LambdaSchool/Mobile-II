import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  AsyncStorage,
  Text } from 'react-native';
import axios from 'axios';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {email: '', password: ''};
  }

  signIn = async () => {
    try {
      const res = await axios.post('https://mobile-server-ii.herokuapp.com/signin', {
        email: this.state.email,
        password: this.state.password
      });

      await AsyncStorage.setItem('token', res.data.token);
      this.props.navigation.navigate('Content');
    } catch (error) {
      return this.setState({error: 'Incorrect Email or Password'});
    }
  }
  render() {
    return (
      <View style={styles.container} >
        <Text>Sign In</Text>
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
        <Button
          title="Sign In"
          onPress={this.signIn} 
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
    borderWidth: 1
  }
});