import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList } from 'react-native';
import axios from 'axios';
import styles from './Styles';

const STORAGE_KEY = 'token';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY).then(token => {
      axios
        .get('https://mobile-server-ii.herokuapp.com/users', {
          headers: {
            authorization: token
          }
        })
        .then(response => {
          this.setState({ users: response.data });
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>JWT Found, Here are the users!</Text>
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => {
            return <Text>{item.email}</Text>;
          }}
          keyExtractor={item => item.email}
        />
      </View>
    );
  }
}
