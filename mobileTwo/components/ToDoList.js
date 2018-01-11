import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      todos: [],
      newToDo: 'stuff',
    };
  }

  componentDidMount() {
    const token = this.props.navigation.state.params.token;
    axios.get('https://mobile-server-ii.herokuapp.com/user', {
      headers: {
        authorization: token,        
      }
    }).then((response) => {
      this.setState({
        todos: response.data.todos,
        userId: response.data._id,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  addToDo() {
    const token = this.props.navigation.state.params.token;    
    axios.post('https://mobile-server-ii.herokuapp.com/todos', {
        text: this.state.newToDo,
      },{ 
        headers: {
         authorization: token,        
        },
    }).then((response) => {
      this.setState({
        todos: response.data.todos,
        userId: response.data._id,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  toggleToDo(todo) {
    todo.completed = !todo.completed;
    const token = this.props.navigation.state.params.token;    
    axios.put(`https://mobile-server-ii.herokuapp.com/todos/${todo._id}`, {}, {
      headers: {
        authorization: token,        
       },
    }).then(response => {
      this.setState({
        todos: response.data.todos,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>To Do List!</Text>
        <TextInput 
          style={styles.textInput}
          onChangeText={(newToDo) => this.setState({ newToDo })}
          value={this.state.newToDo}
        />
        <Button
          title={'Add Item To ToDo List'}
          onPress={this.addToDo.bind(this)}
        />
        <View>
          {this.state.todos.map((todo, index) => {
            const fontColor = todo.completed ? 'red' : 'black';
            return (
              <Text 
                style={{ color: fontColor }}
                onPress={() => {
                  this.toggleToDo(todo, index);
                }}
                key={index}
              >
                {todo.text}
              </Text>
            );
          })}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    height: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: 125,
  },
  toggled: {
    color: 'red',
  },
  unToggled: {
    color: 'black',
  },
});