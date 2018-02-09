import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, AsyncStorage, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Content extends Component {
  constructor() {
    super();
    this.state = {
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
          todos: res.data.todos
        };
      })
    } catch (e) {
      console.log(e);
    }
  }

  handleLogOut = () => {
    AsyncStorage.removeItem('token');
    this.props.navigation.navigate('Home');
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
          todos: res.data.todos,
          todoText: ''
        }
      });
    } catch (e) {
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
          todos: res.data.todos
        };
      });
    } catch (e) {
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
          todos: res.data.todos
        };
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <View style={container}>
        <Text style={header}>{this.state.todos.length > 0 ? 'You got stuff to do' : 'You are free'}</Text>

        {this.state.todos.length > 0 ? (
          <ScrollView style={todoList}>
          <FlatList
            
            data={this.state.todos}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const todoStyle = item.completed ? { textDecorationLine: 'line-through' } : null;
              return (
                <View style={singleTodo}>
                  <TouchableOpacity onPress={() => this.handleToggleTodo(item)}>
                    <Text style={todoStyle}>{item.text}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.handleRemoveTodo(item)}>
                    <Text>Remove</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
          />
          </ScrollView>
        ) : null}
        <View style={textInputContainer}>
          <TextInput
            style={textInput}
            placeholder="Todo"
            value={this.state.todoText}
            onChangeText={(todoText) => this.setState({ todoText })}
          />
          <TouchableOpacity style={button}>
            <Text style={buttonText} onPress={this.handleAddTodo}>Add Todo</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={logout}
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
    alignItems: 'center',
    position: 'relative'
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: '#4CAF50'
  },
  logout: {
    padding: 10,
    margin: 10,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    top: 600
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    alignItems: 'center'
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 535
  },
  textInput: {
    borderBottomWidth: 1,
    width: '60%',
    fontSize: 30
  },
  header: {
    fontSize: 30,
    margin: 25
  },
  todoList: {
    width: '80%',
    height: '60%'
  },
  singleTodo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20
  }
});

const { container, button, buttonText, textInput, header, textInputContainer, todoList, singleTodo, logout } = styles;

export default Content;