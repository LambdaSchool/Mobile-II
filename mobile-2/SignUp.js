import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import Content from './Content';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Sign Up Page',
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleAuth = this.handleAuth.bind(this);
  }

  handleAuth(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://mobile-server-ii.herokuapp.com/users',
      data: {
        "email": this.state.email,
        "password": this.state.password,
      },
    }).then((response) => {
      if (response.data.code === 11000) {
        return this.setState({
          error: 'Email already taken',
        });
      }
      AsyncStorage.setItem('token', response.data.token)
      .then(() => {
        this.props.navigation.navigate('Content');
      })
      .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
  }
  render() {
    return (
      <View>
        <Text>email:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text>password:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button
          title="SignUp"
          onPress={this.handleAuth}
        />
      </View>
    );
  }
}

// this.props.navigation.navigate