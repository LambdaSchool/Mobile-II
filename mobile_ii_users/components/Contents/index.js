import React, { Component } from 'react';
import { Text, View, Button, TextInput, AsyncStorage, FlatList } from 'react-native';
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
        let JWT = {};
        AsyncStorage.getItem('JWT', (err, result) => {
            if (err) console.log(err);
            JWT = JSON.parse(result);
            console.log(result)
        });
        axios.get(postUrl, { header: { authorization: JWT } })
            .then(res => {
                console.log(res.data)
                this.setState({ users: res.data });
            })
            .catch(err => {

            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.formHeader}>This is the Contents Page</Text>
                <FlatList extraData={this.state.users} data={this.state.users} renderItem={(item) => <Text>{item.email}</Text>} />
            </View>
        );
    }
}

export default Contents;