import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import axios from 'axios';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    axios.post('https://mobile-server-ii.herokuapp.com/users').then((response) => {
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
