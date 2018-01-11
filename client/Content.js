import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList
} from 'react-native';

import axios from 'axios';
import styles from './Styles';

export default class Content extends React.Component {
  state = {
    users: []
  };
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token !== null) {
          axios
            .get('https://mobile-server-ii.herokuapp.com/users', {
              headers: {
                Authorization: token
              }
            })
            .then(response => {
              this.setState(prevState => {
                let { users } = prevState;
                console.log(response)
                return {
                  users: response.data
                };                
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  }
  componentWillUnmount() {
    console.log('is Un Mounted');
    this.setState(prevState => {
      let { users } = prevState;
      return {
        users: []
      };                
    });
  }
  render () {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.users}
          renderItem={({ item, index }) => {
            return (
              <View key={item._id}>
                <View style={styles.listCont}>
                  <Text style={styles.textItem}>{item.email}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
}