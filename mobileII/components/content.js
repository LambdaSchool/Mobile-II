import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Axios from 'axios';


export default class Content extends Component {
    constructor() {
        super(); {
            this.state = {
                email: '',
                password: ''
            }
        }
    }
    componentDidMount() {
        const temp = AsyncStorage.getItem('token');
        console.log(temp);
        axios.get('https://mobile-server-ii.herokuapp.com/users', {
            headers: {
                authorization: token, // attach the token as a header
            }
        }).then((response) => {
            this.setState({})
        });
    });
}
render()
return (
   
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});