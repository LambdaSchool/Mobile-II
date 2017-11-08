import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Text } from 'react-native';
import axios from 'axios';

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('https://mobile-server-ii.herokuapp.com/users', {
        headers: {
          authorization: token
        }
      });
      
      this.setState({users: res.data});
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <FlatList
          keyExtractor={item => item._id}
          data={this.state.users}
          renderItem={({ item }) => {
            return (
              <Text style={{color: 'black'}}>{item.email}</Text>
            );
          }} />
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