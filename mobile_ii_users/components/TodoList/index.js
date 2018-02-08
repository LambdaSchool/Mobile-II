import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../Styles';
import axios from 'axios';
const postUrl = 'https://mobile-server-ii.herokuapp.com';
const todos = '/todos';
const user = '/user';


class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            todos: []
        };
    }

    componentDidMount() {
        const todos = AsyncStorage.getItem('todos');
        if (todos != null) {
            todos
                .then(res => {
                    // console.log(res);
                    const parsedTodos = JSON.parse(res);
                    this.setState(prevState => {
                        return {
                            todos: parsedTodos
                        }
                    });
                })
                .catch(err => {
                    console.log(err, 'error on retrieval of todos');
                });
        }
    };

    componentWillUnmount() {
        const todos = Array.from(this.state.todos);
        if (todos != null) {
            AsyncStorage.setItem('todos', JSON.stringify(todos), answer => {
                if (answer === null) { console.log(`Sucess setting items: ${JSON.stringify(todos)}`) }
                else { console.log(answer, 'Something went wrong setting items'); }
            });
        }
    };

    handleButtonPress = () => {
        this.setState(prevState => {
            let { text, todos } = prevState;
            return {
                text: '',
                todos: [...todos, { key: text + todos.length, text, completed: false }]
            };
        });
    };

    handleTextChange = text => {
        this.setState({ text });
    };

    handleComplete = (id) => {
        this.setState(prevState => {
            let oldTodos = prevState.todos;
            let comp = oldTodos[id].completed;
            oldTodos[id].completed = !comp;
            return {
                todos: oldTodos
            }
        })
        this.forceUpdate();
    }

    handleDelete = (id) => {
        this.setState(prevState => {
            let oldTodos = prevState.todos;
            oldTodos.splice(id, 1);
            return {
                todos: oldTodos
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.todos.length === 0 ? (
                    <Text style={styles.textFont}>You're free Oh noes!</Text>
                ) : (
                        <Text style={styles.textFont}>You got stuff to do!</Text>
                    )}
                <TextInput style={styles.inputBox}
                    onChangeText={this.handleTextChange}
                    value={this.state.text}
                    placeholder="Add Todo"
                />
                <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
                <FlatList extraData={this.state}
                    data={this.state.todos}
                    renderItem={({ item, index }) => {
                        if (!item.completed) {
                            return (
                                <View key={item.key} id={index}>
                                    <Text style={styles.uncomplete} onPress={() => this.handleComplete(index)}>
                                        {item.text}
                                    </Text>
                                </View>
                            );
                        } else {
                            return (
                                <View key={item.key} id={index}>
                                    <Text style={styles.completed} onPress={() => this.handleDelete(index)}>
                                        {item.text}
                                    </Text>
                                </View>
                            );
                        }
                    }}
                />
            </View>
        );
    }
}

const { container, textFont } = styles;

export default TodoList;
