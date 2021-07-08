import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  TouchableHighlight,
  AsyncStorage, 
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import axios from 'axios';
const t = require('tcomb-form-native');
import Content from './Content';
const STORAGE_KEY = 'id_token';
const Form = t.form.Form;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.signUp = this.signUp.bind(this);
  }
  // static navigationOptions = {
  //   title: 'SignUp',
  // };
  signUp(){
    axios.post('https://mobile-server-ii.herokuapp.com/users', {
    email: this.state.email,
    password: this.state.password,
  }).then((response) => {
    if(response.data.code === 11000) {
      return this.setState({
        error: 'Email already exists try another',
      });
    }
    AsyncStorage.setItem('token', response.data.token)
    .then(() => {
      this.props.navigate('TodoList');
    }).catch((error) => {
      return (error);
    });
  });
  }
  render() {
    const { navigate } = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Signup</Text>
        </View>
        <Text>{this.state.error && this.state.error.length ? this.state.error : null}</Text>
        <TextInput
         style={styles.textInput}
         onChangeText={(email) => this.setState({ email })}
         value = {this.state.email}
        />
        <TextInput
         style={styles.textInput}
         onChangeText={(password) => this.setState({ password })}
         value = {this.state.password}
        />
        <Button
          title={'Submit'}
          onPress={this.signUp}
        />
        <Button
          title={'Content'}
          onPress={() => this.props.navigation.navigate('Content')}
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
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
});

const SignUpRoutes = StackNavigator({
  SignUp: { screen: SignUp },
  Content: { screen: Content },
});

export default SignUpRoutes;