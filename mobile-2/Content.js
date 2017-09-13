import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native';



export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  static navigationOptions = {
    title: 'Content Page'
  }

  render() {
    return (
      <View>
        <Text>
          Content
        </Text>
      </View>
    );
  }
}
