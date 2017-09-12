import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import axios from 'axios';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    axios.post('https://mobile-server-ii.herokuapp.com/signin').then((response) => {
      this.setState({
        posts: response,
      });
    });
  }

  render() {
    return (
      <View>
        <Text>Enter your email address:</Text>
        <TextInput
          style={{ width: 50 }}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email} />
        <Text>Enter your password:</Text>
        <TextInput
          style={{ width: 50 }}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email} />
      </View>
    );
  }
}
