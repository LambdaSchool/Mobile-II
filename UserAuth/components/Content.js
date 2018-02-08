import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, AsyncStorage, FlatList, TouchableOpacity, TextInput } from 'react-native';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      todos: [],
      todoText: ''
    };
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      const url = 'https://mobile-server-ii.herokuapp.com';
      const res = await axios.get(`${url}/user`, {
        headers: {
          Authorization: token
        }
      });
      console.log(res.data);
      this.setState(prevState => {
        return {
          userId: res.data._id,
          todos: res.data.todos
        };
      })
    } catch(e) {
      console.log(e);
    }
  }

  handleLogOut = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'currentUser']);
      this.props.navigation.navigate('Home');
    } catch(e) {
      console.log(e);
    }
  }

  handleAddTodo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('https://mobile-server-ii.herokuapp.com/todos', {
        text: this.state.todoText
      }, {
        headers: {
          Authorization: token
        }
      });
      this.setState(prevState => {
        return {
          userId: res.data._id,
          todos: res.data.todos,
          todoText: ''
        }
      });
    } catch(e) {
      console.log(e);
    }
  }

  handleToggleTodo = async (todo) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.put(`https://mobile-server-ii.herokuapp.com/todos/${todo._id}`, {}, {
        headers: {
          Authorization: token
        }
      });
      this.setState(prevState => {
        return {
          todos: res.data.todos,
          userId: res.data._id
        };
      });
    } catch(e) {
      console.log(e)
    }
  }

  handleRemoveTodo = async (todo) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios({
        method: 'DELETE',
        url: `https://mobile-server-ii.herokuapp.com/todos/${todo._id}`, 
        headers: { Authorization: token }
      });

      const url = 'https://mobile-server-ii.herokuapp.com';
      const res = await axios.get(`${url}/user`, {
        headers: {
          Authorization: token
        }
      });
      console.log(res.data);
      this.setState(prevState => {
        return {
          userId: res.data._id,
          todos: res.data.todos
        };
      });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    console.log(this.state);
    return (
      <View style={container}>
        <Text style={header}>Todo List - {this.state.todos.length > 0 ? 'You got stuff to do' : 'You are free'}</Text>
        <TextInput 
          style={textInput}
          placeholder="Todo"
          value={this.state.todoText}
          onChangeText={(todoText) => this.setState({ todoText })}
        />
        <TouchableOpacity style={button}>
          <Text style={buttonText} onPress={this.handleAddTodo}>Add Todo</Text>
        </TouchableOpacity>
        {this.state.todos.length > 0 ? (
          <FlatList 
            data={this.state.todos}
            renderItem={({ item, index }) => {
              const todoStyle = item.completed ? { textDecorationLine: 'line-through' } : null;
              return (
                <View key={index}>
                  <Text onPress={() => this.handleToggleTodo(item)} style={todoStyle}>{item.text}</Text>
                  <Text onPress={() => this.handleRemoveTodo(item)}>X</Text>
                </View>
              )
            }}
          />
        ) : null}
        <TouchableOpacity 
          style={button} 
          onPress={() => this.handleLogOut()} 
        >
          <Text style={buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center'
  },
  textInput: {
    borderBottomWidth: 1,
    width: '60%',
    fontSize: 30
  },
  header: {
    fontSize: 30
  }
});

const { container, button, buttonText, textInput, header } = styles;

export default Content;