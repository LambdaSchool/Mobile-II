import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('token')
    .then((token) => { 
      axios.get('https://mobile-server-ii.herokuapp.com/users', {
        headers: {
          authorization: token,
        }
      })
      .then((res) => {
        this.setState({ users: res.data })
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.users}
          renderItem={({item}) => <Text>{item.email}</Text>}
          keyExtractor={ item => item.email }
        />
      </View>
    );
  }
};