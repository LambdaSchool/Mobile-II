import React from 'react';
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

export default class TodoList extends React.Component {
  constructor() {
    super();
    this.state = { list: [] };
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.delete = this.delete.bind(this);
  }

  async submit(text) {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.post(
      'https://mobile-server-ii.herokuapp.com/todos',
      { text },
      { headers: { authorization: token } }
    );
    this.setState({ list: res.data.todos });
    this.refs.textInput.setNativeProps({ text: '' });
  }

  async toggle(id) {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.put(
      `https://mobile-server-ii.herokuapp.com/todos/${id}`,
      {},
      { headers: { authorization: token } }
    );
    this.setState({ list: res.data.todos });
  }

  async delete(id) {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.delete(
      `https://mobile-server-ii.herokuapp.com/todos/${id}`,
      { headers: { authorization: token } }
    );
    this.setState({ list: res.data.todos });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon
            color="#181819"
            name="arrow-forward"
            style={{ paddingBottom: 13, left: -3 }}
          />
          <TextInput
            onSubmitEditing={event => this.submit(event.nativeEvent.text)}
            placeholder="What needs to be done?"
            placeholderTextColor="#181819"
            ref={'textInput'}
            returnKeyType="send"
            style={styles.textInput}
            transparent={true}
          />
          <TouchableHighlight
            activeOpacity={0.5}
            onPress={() => navigate('Users')}
            underlayColor="transparent"
          >
            <View>
              <Icon
                color="#181819"
                name="group"
                style={{ paddingBottom: 11 }}
              />
            </View>
          </TouchableHighlight>
        </View>
        <FlatList
          data={this.state.list}
          keyExtractor={item => item._id}
          style={{ paddingTop: 8 }}
          renderItem={({ item }) => {
            return (
              <View style={styles.todo}>
                <View style={{ left: -2 }}>
                  {item.completed ? (
                    <Icon color="#f6d54a" name="check-circle" />
                  ) : (
                    <Icon color="#f6d54a" name="radio-button-unchecked" />
                  )}
                </View>
                <TouchableHighlight
                  activeOpacity={0.85}
                  onPress={() => this.toggle(item._id)}
                  style={{ flex: 4 }}
                  underlayColor="transparent"
                >
                  <Text
                    style={[
                      styles.todoText,
                      item.completed ? styles.completed : styles.not
                    ]}
                  >
                    {item.text}
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.5}
                  onPress={() => this.delete(item._id)}
                  underlayColor="transparent"
                >
                  <View>
                    <Icon color="#f6d54a" name="close" />
                  </View>
                </TouchableHighlight>
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
  textInput: {
    height: 50,
    flex: 4,
    fontFamily: 'Circular Book',
    fontSize: 24,
    color: '#181819',
    width: width,
    paddingLeft: 3
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
    fontFamily: 'Circular Book Italic',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  not: {
    textDecorationLine: 'none'
  }
});
