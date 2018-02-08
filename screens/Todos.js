import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet, 
  View, 
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';

import axios from 'axios';

import TodoItem from '../components/TodoItem';

class Todos extends Component {
  
  state = {
    token: null,
    newTodo: '',
    todos: []
  };

  handleAddButton = () => {

    const { token, newTodo } = this.state;

    const endpoint = 'https://mobile-server-ii.herokuapp.com/todos';
    console.log(newTodo, token)
    axios
      .post(endpoint, 
        {
          text: newTodo,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {

        const { todos } = res.data;

        this.setState({
          todos
        });

      })
      .catch((err) => console.log(err));

  }

  componentDidMount() {

    const endpoint = 'https://mobile-server-ii.herokuapp.com/user';

    AsyncStorage
      .getItem('token')
      .then(token => {

        axios
          .get(endpoint, {
            headers: {
              authorization: token
            }
          })
          .then(res => {
            
            const { todos } = res.data;

            if (todos) {

              this.setState({
                todos,
                token
              });

            }
            
          })
          .catch((err) => console.log(err));

      })
      .catch(() => alert('AsyncStorage Failed'));

  }

  render() {
    
    return (
      <View style={ styles.container }>

        <Text style={ styles.title }>My Todos</Text>
        
        <TextInput 
          placeholder="Enter the task here"
          value={ this.state.newTodo }
          onChangeText={ (newTodo) => this.setState({ newTodo }) }
          />

        <View style={ styles.flexButtons }>
          <TouchableOpacity style={ styles.button } onPress={ this.handleAddButton }>
            <Text style={ styles.buttonText }>Add Todo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.button } onPress={ this.handleAddButton }>
            <Text style={ styles.buttonText }>Clear</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={ this.state.todos }
          keyExtractor={(item) => item._id }
          renderItem={({ item }) => {
            return <TodoItem id={ item._id } text={ item.text } />;
          }}
          />

      </View>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 24,
    padding: 20
  },
  flexButtons: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 75,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50%',
    height: 75,
    backgroundColor: '#0096ff'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',    
  }
});

export default Todos;
