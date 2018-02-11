import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, AsyncStorage, FlatList, KeyboardAvoidingView, ScrollView } from 'react-native';
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
            showHelp: false,
        };
    }
    keyExtractor = (item, index) => {
        return (`${item}${index}`);
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
                });
        });
    };

    handleButtonPress = () => {
        let JWT = this.state.JWT;
        axios.defaults.headers.common['Authorization'] = JWT;
        if (this.state.text !== '') {
            axios.post(`${postUrl}${todosRoute}`, { text: this.state.text })
                .then(result => {
                    // console.log(result.data)
                })
                .catch(err => {
                    // console.log(err)
                })

            this.setState(prevState => {
                let { text, todos } = prevState;
                return {
                    text: '',
                    todos: [...todos, { key: text + todos.length, text, completed: false }]
                };
            });
        } else {
            return;
        }
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
                // console.log(`ToggleComplete on ${this.state.todos[id].text}`);
            })
            .catch(err => {
                // console.log(err);
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
                // console.log(`Deleted this todo: ${this.state.todos[id].text}`);
            })
            .catch(err => {
                // console.log(`Could Not Delete this todo: ${this.state.todos[id].text} from the database`);
            });

        this.setState(prevState => {
            let oldTodos = prevState.todos;
            oldTodos.splice(id, 1);
            return {
                todos: oldTodos
            };
        });
    }

    hideHelp = () => {
        let showHelpCopy = !this.state.showHelp;
        this.setState({ showHelp: showHelpCopy });
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.todoContainer}
                behavior="padding"
            >
                <View style={styles.formWrapper}>
                    {this.state.todos.length === 0 ? (
                        <Text style={styles.textFont}>Add something to the list!</Text>
                    ) : (
                            <Text style={styles.textFont}>You have stuff to do!</Text>
                        )}
                    <View style={this.state.showHelp ? (styles.instructionsWrapper) : (styles.instructionsWrapperHide)}>
                        <Text style={styles.instructions}>- Long Press on an "Unfinished" to make it "Finished"</Text>
                        <Text style={styles.instructions}>- Long Press a "Finished" to delete it</Text>
                        <Text style={styles.instructions}>- Quick Tap a "Finished" to make it "Unfinished"</Text>

                    </View>
                    <View style={styles.instructionsWrapper}>
                        <Text
                            onPress={() => this.hideHelp()}
                            style={this.state.showHelp ? (styles.helpInteractiveText) : (styles.helpInteractiveTextSmall)}
                        >
                            {this.state.showHelp ? ('Hide Instructions') : ('Show Instructions')}
                        </Text>
                    </View>
                    <View style={styles.itemsAddWrapper}>
                        <TextInput style={styles.addInput}
                            onChangeText={this.handleTextChange}
                            onSubmitEditing={() => this.handleButtonPress()}
                            underlineColorAndroid='transparent'
                            value={this.state.text}
                            placeholder="Add Todo"
                        />
                        <TouchableOpacity style={styles.addButton} onPress={() => this.handleButtonPress()}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.wrapScrollView}>
                    <FlatList keyExtractor={this.keyExtractor} extraData={this.state}
                        data={this.state.todos}
                        renderItem={({ item, index }) => {
                            if (!item.completed) {
                                return (
                                    <View id={index}>
                                        <Text style={styles.incomplete}
                                            onLongPress={() => this.handleComplete(index)}
                                        >
                                            {item.text}
                                        </Text>
                                    </View>
                                );
                            } else {
                                return (
                                    <View id={index}>
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
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const { container, textFont } = styles;

export default TodoList;
