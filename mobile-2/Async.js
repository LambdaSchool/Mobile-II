import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';

export default class Async extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      users:[]
    };
  }

  componentDidMount() {
    axios.get('https://mobile-server-ii.herokuapp.com/').then((response) => {
      this.setState({
        users: response
      });
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => {
          return (
            <Text>
              {item.name}
            </Text>
          }}/>


      </View>
    )
  }

}
