import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  AsyncStorage,
  Image,
} from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
    this.signUp = this.signUp.bind(this);
  }

  static navigationOptions = {
    title: 'Sign Up'
  }

  signUp() {
    console.log('SignUp:',this.state);
    axios.post('https://mobile-server-ii.herokuapp.com/users', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      if (response.data.code === 11000) {
        return this.setState({
          error: 'That email and password combo is no bueno for registering with our site, dood.',
        });
      }
      AsyncStorage.setItem('token', response.data.token).then(() => {
        this.props.navigation.navigate('Content');
        // this.props.navigate('Content');
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styles.searchbar}>
        {/* WHAT DOES THIS TERNARY ERROR CHECK DO?????? */}
        <Text>{this.state.error && this.state.error.length ? this.state.error : null}</Text>
        <Text>Enter your email address:</Text>
        <TextInput
          style={styles.input}
          placeholder={'email'}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email} />
        <Text>Enter your password:</Text>
        <TextInput
          style={styles.input}
          placeholder={'password'}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry={true} />
        <TextInput
          style={styles.input}
          placeholder={'confirm password'}
          onChangeText={(passwordConfirm) => this.setState({ passwordConfirm })}
          value={this.state.passwordConfirm}
          secureTextEntry={true} />
        <Text>
          {/* {this.state.password === this.state.passwordConfirm ? 'Your password matches!' : 'Please confirm password'} */}
          {this.state.password === '' ? 'Please confirm your password' : this.state.password === this.state.passwordConfirm ? 'Your password matches!' : 'Your password doesn\'t match!'}
        </Text>
        <Button
          title={'Press here to Sign Up!'}
          onPress={this.signUp}
        />
        <Image
          // source={{ uri: 'http://mylittlepony.eaglemoss.com/Content/images/bpony.png' }}
          source={{ uri: 'https://media.giphy.com/media/cDdx2FrW7b3sk/giphy.gif' }}
          // source={{ uri: 'https://media1.giphy.com/media/GCukKyf32k9B6/giphy.gif' }}
          style={{ height: height / 2, width: width, resizeMode: 'stretch' }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    paddingTop: 2,
  },
  input: {
    height: 25,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 2,
    width: width * .85,
    padding: 2  ,
  },
});
