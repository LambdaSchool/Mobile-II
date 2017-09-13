import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';



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
  
  handleAuth() {
    console.log('string')
    axios.post('https://mobile-server-ii.herokuapp.com/users', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(function (response) {
      if (response.data.code === 11000) {
        return this.setState({
          // something here
        });
      }
      AsyncStorage.setItem('token', response.data.token).then(() => {
        this.props.navigate('Content');
      })
      .catch(function (error) {
        console.log(error)
      });
    })
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
          title={'sign up'}
          onPress={() => {
            this.handleAuth
            this.props.navigation.navigate('Content')}}
        />
      </View>
    );
  }
}
// this.props.navigation.navigate