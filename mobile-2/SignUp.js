import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';



export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleAuth = this.handleAuth.bind(this);
  }
  static navigationOptions = {
    title: 'Sign Up Page'
  }

  handleAuth() {
    console.log('string')
   axios.post('https://mobile-server-ii.herokuapp.com/users', {
    email: this.state.props.email,
    password: this.state.props.password
  })
  .then(function (response) {
    console.log(response)
    AsyncStorage.setItem('token', response.data.token).then(() => {
      this.props.navigate('Content');
  })
  .catch(function (error) {
    console.log(error)
  });
     })
   }
/*
make post call to /users then grab token off response, save to asynStorage
*/
  render() {
    return (
      <View>

        <Text>
          email:
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />
        <Text>
          password:
        </Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
      />
      <Button
        title = {'sign up'}
        onPress = {() => {
        this.handleAuth
          // this.props.navigation.navigate('')
        }}
      />
      </View>
    );
  }
}
