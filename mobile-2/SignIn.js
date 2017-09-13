import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import Content from './Content';

export default class SignIn extends React.Component {
  static navigationOptions = {
    title: 'Sign In Page',
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignIn(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'https://mobile-server-ii.herokuapp.com/signin',
      data: {
        "email": this.state.email,
        "password": this.state.password,
      },
    }).then((response) => {
      AsyncStorage.setItem('token', response.data.token)
      .then(() => {
        this.props.navigation.navigate('Content');
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
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
          title="SignIn"
          onPress={this.handleSignIn}
        />
      </View>
    );
  }
}