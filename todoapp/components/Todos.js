import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage,
    FlatList
} from 'react-native';
import axios from 'axios';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com';

export default class Todos extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('token')
            .then((token) => {
                axios
                    .get(`${ROOT_URL}/user`, {
                        headers: {
                            authorization: token,
                        }
                    })
                    .then(res => {
                            this.setState({ todos: res.data.todos });
                    })
            })
            .catch(error => {
                console.log('Error getting your token: ', error);
            });
    };

    render () {
        return (
            <View>
                <Text>Roll Up Your Sleeves & Get These Done Today</Text>
                { this.state.todos !== null ? 
                <FlatList
                    data={this.state.users.data.todos}
                    renderItem={({ item, index }) => {
                        return (
                            <View key = {item.id}>
                                <Text>{item.text}</Text>
                            </View>
                        );
                    }}
                /> : <Text>No Todos! WooHoos!</Text>
                }
            </View>
        );
    }
}