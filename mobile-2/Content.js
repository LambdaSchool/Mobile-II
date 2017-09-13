import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

export default class Content extends React.Component {
  static navigationOptions = {
    title: 'Content Page'
  }
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      axios({
        method: 'get',
        url: 'https://mobile-server-ii.herokuapp.com/users',
        headers: {
          "authorization": token,
        },
      })
      .then((response) => {
        this.setState({users: response.data});
    })
    .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={item => item._id}
          data={this.state.users}
          renderItem={({item}) => {
            return <Text>{item.email}</Text>
          }}/>
      </View>
    );
  }
}

