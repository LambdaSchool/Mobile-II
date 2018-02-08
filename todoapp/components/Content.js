import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage,
    FlatList
} from 'react-native';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com';

export default class Content extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('token')
            .then((token) => {
                axios
                    .get(`${ROOT_URL}/users`, {
                        headers: {
                            authorization: token,
                        }
                    })
                    .then(res => {
                            this.setState({ users: res });
                    })
            })
            .catch(error => {
                console.log('Error getting your token: ', error);
            });
    };

    render () {
        return (
            <View>
                <Text>List of Users of this Service</Text>
                <FlatList
                    data={this.state.users}
                    renderItem={({ item, index }) => {
                        return (
                            <View key = {index}>
                                <Text>{item.email}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        );
    }
}