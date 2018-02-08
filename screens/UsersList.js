import React, { Component } from 'react';
import { 
  AsyncStorage,
  StyleSheet, 
  View, 
  Text,
  FlatList
} from 'react-native';

import axios from 'axios';

class UsersList extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    
    const { navigate } = this.props.navigation;

    const endpoint = 'https://mobile-server-ii.herokuapp.com/users';

    AsyncStorage.getItem('token')
      .then((token) => {
        
        axios
          .get(endpoint, {
            headers: {
              authorization: token
            }
          })
          .then((res) => {
            
            this.setState({
              users: res.data
            });
    
          })
          .catch((err) => navigate('Home'));

      })
      .catch(() => alert('User not Logged In'));


  }

  render() {
    
    return (
      <View>

        <Text style={ styles.listTitle }>List of Users</Text>

        <View>
          <FlatList
            data={ this.state.users }
            keyExtractor={ (item, index) => index }
            renderItem={ ({ item }) => <Text style={ styles.listItem }>{ item.email }</Text> } />
        </View>

      </View>
    );

  }

}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    padding: 20
  },
  listItem: {
    paddingVertical: 5,
    paddingLeft: 20
  }
});

export default UsersList;
