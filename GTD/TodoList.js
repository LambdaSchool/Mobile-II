import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
} from 'react-native';

const axios = require('axios');
import styles from './Styles';

export default class TodoList extends React.Component {
  state = {
    tasks: [],
    text: '',
    error: '',
  };

  componentDidMount() {
    console.log('is Mounted');
    const tasks = this.state.tasks;

    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        // retrieve the token from "localStorage"
        if (token !== null) {
          axios
            .get('https://mobile-server-ii.herokuapp.com/user', {
              headers: {
                Authorization: token, // attach the token as a header
              },
            })
            .then(response => {
              this.setState(prevState => {
                let { tasks } = prevState;
                return {
                  tasks: response.data.todos,
                };
              });
              console.log('tasks', this.state.tasks);
            })
            .then(() = > {
              
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  }

  componentWillUnmount() {
    console.log('is Un Mounted');
  }

  handleTextChange = text => {
    this.setState({ text });
  };

  editTodo = index => {
    const myToken = AsyncStorage.getItem('token');
    const id = this.state.tasks[index]._id;
    console.log(id);
    myToken
      .then(token => {
        console.log('retrieved the token from "localStorage"');
        if (token !== null) {
          axios
            .put(`https://mobile-server-ii.herokuapp.com/todos/${id}`, {
              headers: {
                authorization: token,
              },
            })
            .then(response => {
              console.log(response);
              this.props.navigation.navigate('TodoList');
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  };

  addTodo = () => {
    console.log('is sending to DB');
    if (this.state.text === '') {
      this.setState({ error: `No message in text field.` });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 2000);
      return;
    }
    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        console.log('retrieved the token from "localStorage"');
        if (token !== null) {
          axios
            .post(
              'https://mobile-server-ii.herokuapp.com/todos',
              {
                text: this.state.text,
              },
              {
                headers: {
                  authorization: token,
                },
              }
            )
            .then(response => {
              this.props.navigation.navigate('TodoList');
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  };

  deleteTask = index => {
    const myToken = AsyncStorage.getItem('token');
    const id = this.state.tasks[index]._id;
    console.log(id);
    myToken
      .then(token => {
        console.log('retrieved the token from "localStorage"');
        if (token !== null) {
          axios
            .delete(`https://mobile-server-ii.herokuapp.com/todos/${id}`, {
              headers: {
                authorization: token,
              },
            })
            .then(response => {
              console.log(response);
              this.props.navigation.navigate('TodoList');
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  };

  render() {
    // console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          {this.state.tasks.length > 0
            ? 'You have stuff to do!'
            : `You're free to play PUBG`}
        </Text>
        {this.state.error !== '' ? <Text>{this.state.error}</Text> : null}
        <FlatList
          keyExtractor={item => item._id}
          style={styles.list}
          data={this.state.tasks}
          renderItem={({ item, index }) => {
            return (
              <View>
                <View style={styles.listCont}>
                  <Text style={styles.textItem}>{item.text}</Text>
                  <Button
                    color="red"
                    onPress={() => this.deleteTask(index)}
                    title="Delete"
                  />
                  <Button
                    color="green"
                    onPress={() => this.editTodo(index)}
                    title={status}
                  />
                </View>
                <View style={styles.hr} />
              </View>
            );
          }}
        />
        <TextInput
          style={styles.inputStyles}
          onSubmitEditing={this.addTodo}
          onChangeText={this.handleTextChange}
          value={this.state.text}
          placeholder="Add Task"
        />
      </View>
    );
  }
}
