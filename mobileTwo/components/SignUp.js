import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'example_email@gmail.com',
      password: 'example',
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    axios.post('https://mobile-server-ii.herokuapp.com/users', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      if (response.data.code === 11000) {
        return this.setState({
          error: 'username already taken',
        });
      }
      this.props.navigation.navigate('ToDoList', { token: response.data.token });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <Text>{this.state.error && this.state.error.length ? this.state.error : null}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title={'SignUp'}
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
    height: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: 125,
  },
});