import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, AsyncStorage, FlatList } from 'react-native';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const url = 'https://mobile-server-ii.herokuapp.com';
    axios.get(`${url}/users`, {
      headers: {
        Authorization: token
      }
    })
    .then(res => {
      this.setState({ users: res.data });
    })
    .catch(err => console.log(err));
  }

  render() {
    const renderUsers = this.state.users ? 
      <FlatList
        style={usersWrapper} 
        data={this.state.users}
        renderItem={item => (
          <View key={item._id}>
            <Text>{item._id}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    : null;

    return (
      <View style={container}>
        <View style={usersWrapper}>
          {renderUsers}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  usersWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  todosWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

const { container, usersWrapper, todosWrapper } = styles;

export default Content;