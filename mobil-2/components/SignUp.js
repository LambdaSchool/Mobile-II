import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter Email</Text>
        <TextInput>
          style={styles.inputField}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        </TextInput>
        <Text>Enter Password</Text>
        <TextInput>
          style={styles.inputField}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        </TextInput>
        <Button 
          title={'Sign Up'}
          onPress={() => {
            axios.post('https://mobile-server-ii.herokuapp.com/users', {
              email: this.state.email,
              password: this.state.password
            })
            .then(() => this.props.navigation.navigate('Content'));
          }}
        />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {

  }
});

  export default SignUp;