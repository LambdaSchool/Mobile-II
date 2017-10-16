import React from 'react';
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  
  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get('https://mobile-server-ii.herokuapp.com/users', {
      headers: { authorization: token }
    });
    this.setState({ users: res.data });
  }

  render() {
    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon color="#181819" name="arrow-forward" style={{ paddingBottom: 13, left: -3 }} />
          <Text style={styles.title}>Users</Text>
          <TouchableHighlight activeOpacity={0.5} underlayColor="transparent" onPress={() => goBack()}><View><Icon color="#181819" name="format-list-bulleted" style={{ paddingBottom: 11 }} /></View></TouchableHighlight>
        </View>
      <FlatList style={{ paddingTop: 8 }} keyExtractor={item => item._id} data={this.state.users} renderItem={({ item }) => {
          return (
            <View style={styles.todo}>
              <View style={{ left: -2 }}><Icon color="#f6d54a" name="person" /></View>
              <Text style={styles.todoText}>{item.email}</Text>
            </View>
          );
        }}
      />
    </View>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181819',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  inputContainer: {
    backgroundColor: '#f6d54a',
    height: 80,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8
  },
  title: {
    height: 40,
    flex: 4,
    fontFamily: 'Circular Book',
    fontSize: 24,
    color: '#181819',
    width: width,
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    width: width,
    padding: 8
  },
  todoText: {
    flex: 4,
    justifyContent: 'flex-start',
    left: 3,
    top: -2,
    fontFamily: 'Circular Book',
    fontSize: 24,
    color: '#f6d54a'
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  not: {
    textDecorationLine: 'none',
  }
});
