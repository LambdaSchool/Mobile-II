import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';



export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static navigationOptions = {
    title: 'Sign In Page'
  }

  render() {
    return (
      <View>
        <Text>
          Monkey Business
        </Text>
      </View>
    );
  }
}
