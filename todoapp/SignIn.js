import React from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    AsyncStorage,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import axios from 'axios';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com';

export default class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleButtonSubmit() {
        console.log('test101'); //works
        const email = this.state.email;
        const password = this.state.password;
        axios
            .post(`${ROOT_URL}/signin`, { email, password })
            .then(res => {
                AsyncStorage.setItem('token', res.data.token)
                .then((response) => {
                    console.log('successful login');
                    this.props.navigation.navigate('Content');
                })
                .catch(error => {
                    console.log('Error saving JWT: ', error);
                })
            })
            .catch(error => {
                console.log('Error signing in: ', error);
            });

    }

    render () {
        return (
            <View style={container}>
                <Text>Log In Screen</Text>
                <TextInput onChangeText={(text) => this.setState({ email: text })} placeholder = 'Enter Your Email Address' style={input} />
                <TextInput onChangeText={(text) => this.setState({ password: text })} placeholder = 'Enter Your Password' style={input} />
                <TouchableOpacity onPress={this.handleButtonSubmit.bind(this)} style={button}>
                    <Text>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        margin: 10,
        width: 200,
    },
    button : {
      alignItems: 'center',
      height: 48,
      width: 200,
      padding: 10,
      margin: 10,
      backgroundColor: '#add8e6',
    },
  
  });
  const { container, input, button } = styles;