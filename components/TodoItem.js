import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';

class TodoItem extends Component {

  state = {
    completed: false
  }

  handleClick = () => {

    this.setState({
      completed: true
    });

  }

  render() {

    return (
      <TouchableOpacity onPress={ this.handleClick }>
        <Text style={ [ styles.todoText, { textDecorationLine: (this.state.completed) ? 'line-through' : 'none' } ] }>
          { this.props.text }
        </Text>
      </TouchableOpacity>
    );

  }

}

const styles = StyleSheet.create({
  todoText: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});

export default TodoItem;
