import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, FlatList } from 'react-native';
import {StackNavigator} from 'react-navigation';
import axios from 'axios';

export class ContentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => { // retrieve the token from "localStorage"
      axios.get('https://mobile-server-ii.herokuapp.com/users', {
        headers: {
         authorization: token, // attach the token as a header
        }
      }).then((response) => {
        this.setState({ data: response.data})
      });
    });
  } 
  render() {
    return (
      <View style={styles.container}>
        <Text>Users</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text>{item.email}</Text>}
        />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
