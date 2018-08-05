import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import axios from 'axios';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.logOut = this.logOut.bind(this);
    }
    logOut() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Home');
    }
    componentDidMount() {
        //const token = this.props.navigation.state.params.token;
        const id = this.props.navigation.state.params._id;
        console.log(id);
        // axios.get('https://mobile-server-ii.herokuapp.com/users', {
        //     headers: {
        //         authorization: token,
        //     },
        // })
        // .then(res => {
        //     const resultArray = res.data;
        //     const userDisplay = resultArray.find(userDisplay => userDisplay._id === id);
        //     console.log(userDisplay);
        //     this.setState({ email: userDisplay.email });
        // })
        // .catch(err => {
        //     console.log(err);
        // });

        AsyncStorage.getItem('token')
            .then((token) => { // retrieve the token from "localStorage"
                console.log(token); 
                axios.get('https://mobile-server-ii.herokuapp.com/users', {
                    headers: {
                        authorization: token,
                    },
                })
                .then(res => {
                    const resultArray = res.data;
                    const userDisplay = resultArray.find(userDisplay => userDisplay._id === id);
                    console.log(userDisplay);
                    this.setState({ email: userDisplay.email });
                })
                .catch(err => {
                    console.log(err);
                });
            });
    }
    static navigationOptions = {
        title: 'User Page'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ marginBottom:30, fontSize: 14, textAlign: 'center' }}>
                    Hello {this.state.email}
                </Text>
                <Button 
                    title={'Log Out'}
                    onPress={this.logOut}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b4b4b4',
  },
});

export default Content;