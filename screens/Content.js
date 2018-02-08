import React, { Component } from 'react';
import { 
  AsyncStorage,
  StyleSheet, 
  View, 
  Text,
  Button,
  FlatList
} from 'react-native';

import UsersList from './UsersList';

class Content extends Component {
  
  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <View>

        <Text style={ styles.title }>Welcome !</Text>

        <View>
          <Button title="List Users" onPress={ () => { navigate('UsersList') } } />
          <Button title="Todo List" onPress={ () => { navigate('Todos') } } />
        </View>

      </View>
    );

  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    padding: 20
  },
});

export default Content;
