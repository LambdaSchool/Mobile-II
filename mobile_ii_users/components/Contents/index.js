import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage, FlatList, ScrollView } from 'react-native';
import styles from '../Styles';
import axios from 'axios';
const postUrl = 'https://mobile-server-ii.herokuapp.com/users';

class Contents extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        }
    }
    componentDidMount() {
        let JWT = '';
        AsyncStorage.getItem('JWT', (err, result) => {
            if (err) console.log(err);
            JWT = String(result);
            axios.get(postUrl, { headers: { authorization: JWT } })
                .then(res => {
                    this.setState({ users: res.data });
                })
                .catch(err => {
                    console.log('Could not set users to state');
                });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.formHeader}>This the Members List</Text>
                <ScrollView style={styles.contentList}>
                    <FlatList keyExtractor={(item) => item._id} data={this.state.users} renderItem={({ item }) => {
                        return <Text key={item._id}>{item.email}</Text>;
                    }} />
                </ScrollView>
            </View>
        );
    }
}

export default Contents;