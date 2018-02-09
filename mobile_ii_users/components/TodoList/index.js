import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styles from '../Styles';
import axios from 'axios';
const postUrl = 'https://mobile-server-ii.herokuapp.com';
const todosRoute = '/todos';
const userRoute = '/user';


class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            todos: [],
            JWT: '',
        };
    }

    componentDidMount() {
        let JWT = '';
        const token = AsyncStorage.getItem('JWT', (err, result) => {
            if (err) console.log(err);
            JWT = String(result);
            axios.get(`${postUrl}${userRoute}`, { headers: { authorization: JWT } })
                .then(res => {
                    this.setState({ todos: res.data.todos, JWT });
                })
                .catch(err => {
                    console.log('Could not get User Object and Todos from Server, Using Local Data Instead!');
                    // const localTodos = AsyncStorage.getItem('todos', (error, result) => {
                    //     if (error) console.log(error);
                    //     let retrievedTodos = JSON.parse(result);
                    //     this.setState({ todos: retrievedTodos });
                    // });
                });
        });
    };

    // componentWillUnmount() {
    //     const todos = Array.from(this.state.todos);
    //     if (todos != null) {
    //         AsyncStorage.setItem('todos', JSON.stringify(todos), answer => {
    //             if (answer === null) { console.log(`Success setting items: ${JSON.stringify(todos)}`) }
    //             else { console.log(answer, 'Something went wrong setting items'); }
    //         });
    //     }
    // };

    handleButtonPress = () => {
        let JWT = this.state.JWT;
        axios.defaults.headers.common['Authorization'] = JWT;

        axios.post(`${postUrl}${todosRoute}`, { text: this.state.text })
            .then(result => {
                console.log(result.data)
            })
            .catch(err => {
                console.log(err)
            })

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
        let JWT = this.state.JWT;
        let tid = this.state.todos[id]._id;
        axios.defaults.headers.common['Authorization'] = JWT;

        axios.put(`${postUrl}/todos/${tid}`, {})
            .then(result => {
                console.log(`ToggleComplete on ${this.state.todos[id].text}`);
            })
            .catch(err => {
                console.log(err);
            })

        this.setState(prevState => {
            let oldTodos = prevState.todos;
            oldTodos[id].completed = !oldTodos[id].completed;
            return {
                todos: oldTodos
            }
        })
    }

    handleDelete = (id) => {
        let JWT = this.state.JWT;
        let tid = this.state.todos[id]._id;
        axios.defaults.headers.common['Authorization'] = JWT;

        axios.delete(`${postUrl}/todos/${tid}`, {})
            .then(result => {
                console.log(`Deleted this todo: ${this.state.todos[id].text}`);
            })
            .catch(err => {
                console.log(`Could Not Delete this todo: ${this.state.todos[id].text} from the database`);
            });

        this.setState(prevState => {
            let oldTodos = prevState.todos;
            oldTodos.splice(id, 1);
            return {
                todos: oldTodos
            };
        });
    }

    render() {
        return (
            <View style={styles.todoContainer}>
                <View style={styles.formWrapper}>
                    {this.state.todos.length === 0 ? (
                        <Text style={styles.textFont}>You're free Oh noes!</Text>
                    ) : (
                            <Text style={styles.textFont}>You got stuff to do!</Text>
                        )}
                    <Text style={styles.formText}>Instructions:</Text>
                    <Text style={styles.insturctions}>Long Press on a Todo will Cross It out making it finished</Text>
                    <Text style={styles.insturctions}>Long Press on a Crossed Out Todo will delete it</Text>
                    <Text style={styles.insturctions}>Quick Tap on a Crossed Out Todo will make it unfinished again</Text>
                    <TextInput style={styles.shortInput}
                        onChangeText={this.handleTextChange}
                        underlineColorAndroid='transparent'
                        value={this.state.text}
                        placeholder="Add Todo"
                    />
                    <Button onPress={() => this.handleButtonPress()} title="Add Todo" />
                    <FlatList keyExtractor={(item) => item._id} extraData={this.state}
                        data={this.state.todos}
                        renderItem={({ item, index }) => {
                            if (!item.completed) {
                                return (
                                    <View key={item.key} id={index}>
                                        <Text style={styles.incomplete}
                                            onLongPress={() => this.handleComplete(index)}
                                        >
                                            {item.text}
                                        </Text>
                                    </View>
                                );
                            } else {
                                return (
                                    <View key={item.key} id={index}>
                                        <Text style={styles.completed}
                                            delayLongPress={3800}
                                            onLongPress={() => this.handleDelete(index)}
                                            onPress={() => this.handleComplete(index)}>
                                            {item.text}
                                        </Text>
                                    </View>
                                );
                            }
                        }}
                    />
                </View>
            </View>
        );
    }
}

const { container, textFont } = styles;

export default TodoList;
