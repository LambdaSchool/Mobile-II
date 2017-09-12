import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
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
          style={styles.input1}
          // placeHolder={'poop on a stick'}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email} />
        <Text>Enter your password:</Text>
        <TextInput
          style={styles.input2}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.email} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchbar: {
    // flexDirection: 'row',
    paddingTop: 2,
  },
  input1: {
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
  input2: {
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
});
