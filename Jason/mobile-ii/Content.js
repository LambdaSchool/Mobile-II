import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import axios from 'axios';


export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  static navigationOptions = {
    title: 'Content Page'
  }

  componentDidMount() {
    axios.get('https://mobile-server-ii.herokuapp.com/users').then((response) => {
      this.setState({
        users: response,
      });
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.users}
          renderItem={({ item }) => {
            return <Text>{item.text}</Text>;
          }}/>
      </View>
    );
  }
}
