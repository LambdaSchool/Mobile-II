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

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.signIn = this.signIn.bind(this);
  }

  static navigationOptions = {
    title: 'Sign In'
  }

  signIn() {
    console.log('SignIn:', this.state);
    axios.post('https://mobile-server-ii.herokuapp.com/signin', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
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
        <Button
          title={'Press here to Sign In.'}
          onPress={this.signIn}
        />
        <Image
          source={{ uri: 'https://media.tenor.com/images/44fbe7833375c0d0f7fce91f164dc76d/tenor.gif' }}
          style={{ height: height / 2, width: width }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    // flexDirection: 'row',
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
