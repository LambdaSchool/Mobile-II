import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  FlatList,
} from 'react-native';
import axios from 'axios';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      axios.get('https://mobile-server-ii.herokuapp.com/users', {
        header: {
          authorization: token
        }
      }).then((response) => {
        this.setState({ content: response.data })
      });
    })
  }

  static navigationOptions = {
    title: 'Content'
  }

  render() {
    return (
      <View>
        <FlatList 
          data={
            this.state.content
          }
          renderItem={({ item }) =><Text>{item.email}</Text>}
          keyExtractor={ item => item._id }
        />
      </View>
    );
  }
}

export default Content;