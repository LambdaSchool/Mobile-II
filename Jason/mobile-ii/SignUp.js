import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');


export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  signUp() {
    console.log(this.state);
    axios.post('https://mobile-server-ii.herokuapp.com/users', {
       email: this.state.email,
       password: this.state.password,
      }).then((response) => {
      // Update state in here
      // if (response.data.code === 11000)
    });
    AsyncStorage.setItem('token', response.data.token).then(() => {
      this.props.navigate('Content');
    });
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
      <View style={styles.searchbar}>
        <Text>Enter your email address:</Text>
        <TextInput
          style={styles.input}
          // placeHolder={'poop on a stick'}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email} />
        <Text>Enter your password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.pasword} />
        <Button style={styles.button}
          title={'Submit'}
          onPress={this.signUp} />
          {/* onPress={() => {
            this.props.navigation.navigate('Signin');
          }} /> */}
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
    // borderColor: 'red',
    // backgroundColor: 'pink',
    borderRadius: 20,
    // marginLeft: 30,
    marginRight: 5,
    marginTop: 2,
    marginBottom: 2,
    width: width * .85,
    padding: 8,
  },
  button: {
    borderWidth: 1,
  },
});
