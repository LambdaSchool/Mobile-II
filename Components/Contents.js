import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';


class Contents extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const token = AsyncStorage.getItem(token);
        token
            .then(parsedToken => {
                axios.get(URL, {
                    headers: {
                        authorization: token
                    }
                })
                    .then(response => {
                        const users = res.data;
                        this.setState({
                            users,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({ error: 'Er' })
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <View style={container} >
                <Text>
                    Hello from Contents</Text>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#56D2C7',
        justifyContent: 'center',
        height: 50,
        marginTop: 25,
    },

});

const { container } = styles;

export default Contents;