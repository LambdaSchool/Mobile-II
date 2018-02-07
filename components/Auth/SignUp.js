import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { signUp } from './AuthActions';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

class SignUp extends React.Component {
  state = {
    email: '',
    password: ''
  }
  successAlert = () => {
    Alert.alert(
      'Sign Up Success', 
      'Sign up successful. Redirecting to content...', 
      [{ text: 'OK' }]
    );
  }
  failAlert = () => {
    Alert.alert(
      'Sign Up Failure', 
      'Sign up failed. There was a network error or a user with that email already exists.', 
      [{ text: 'OK' }]
    );
  }
  submit = async () => {
    const { email, password } = this.state;
    try {
      await this.props.signUp({email, password});
      this.successAlert();
      this.props.navigation.navigate('Content');
    } catch(error) {
      console.log(error);
      this.failAlert();
    }
  }
  render() {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        style={{width: windowWidth}} 
        placeholder='Email'
        onChangeText={(email) => this.setState({email})}
      />
      <TextInput 
        style={{width: windowWidth}} 
        secureTextEntry={true}
        placeholder='Password'
        onChangeText={(password) => this.setState({password})}
      />
      <Button onPress={this.submit} title="Submit" />
    </View>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication
  };
}

const mapDispatchToProps = { signUp };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);