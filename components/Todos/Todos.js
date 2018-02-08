import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList, 
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentTodos, addTodo, toggleTodo, deleteTodo } from './TodoActions';
class Todos extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  handleButtonPress = () => {
    this.props.addTodo(this.state.text);
    this.setState({text: ''});
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  handleCompletedToggle = todoKey => {
    const todos = this.props.todos.list.slice();
    const todo = todos.find((todo) => todo.key === todoKey);
    this.props.toggleTodo(todo._id);
  };

  removeCompleted = () => {
    const todos = this.props.todos.list.slice();
    const filteredTodos = todos.filter(todo => todo.completed);
    console.log(filteredTodos);
    filteredTodos.forEach(todo => this.props.deleteTodo(todo._id));
  };

  componentDidMount() {
    this.props.fetchCurrentTodos();
  };

  render() {
    const { token } = this.props.authentication;
    const { isPending, list } = this.props.todos;
    if (!token) return <View><Text>Not Authenticated</Text></View>;
    if (isPending) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    const todosWithKeys = list.map((todo, i) => {
      todo.key = todo._id;
      return todo;
    })
    return (
      <View style={container}>
        {todosWithKeys.length === 0 ? (
          <Text style={textFont}>You're free</Text>
        ) : (
          <Text style={textFont}>You got stuff to do!</Text>
        )}
        <TextInput
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Todo"
        />
        <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
        <FlatList
          data={todosWithKeys}
          renderItem={({ item, index }) => {
            return (
              <View>
                <Text
                  onPress={() => this.handleCompletedToggle(item.key)}
                  style={item.completed ? styles.lineThrough : null}
                >
                  {item.text}
                </Text>
              </View>
            );
          }}
        />
        <View style={buttonWrapper}>
          <Button title="Remove Completed" onPress={() => this.removeCompleted()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineThrough: {
    textDecorationLine: 'line-through'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33
  },
  textFont: {
    fontSize: 28
  }, 
  buttonWrapper: {
    marginBottom: 25
  }
});

const { container, textFont, buttonWrapper } = styles;

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
    todos: state.todos
  };
};

const mapDispatchToProps = { fetchCurrentTodos, addTodo, toggleTodo, deleteTodo };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);