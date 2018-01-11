import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    AsyncStorage,
} from 'react-native';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        const { email, password } = this.state;
        axios.post('https://mobile-server-ii.herokuapp.com/users', { email, password })
            .then((response) => {
                if (response.data.code === 11000) {
                    return this.setState({ error: 'That email is already in use.' });
                }
                AsyncStorage.setItem('token', response.data.token)
                    .then(() => {
                        this.props.navigation.navigate('Content');
                    })
            }).catch((error) => {
            console.log(error);
        });
    }

    static navigationOptions = {
        title: 'Sign Up'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Please enter an email address
                </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    placeholder='Email'
                />
                <Text>
                    Please enter a password
                </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    placeholder='Password'
                />
                <Button
                    title={'Submit'}
                    onPress={() => {
                        this.signUp();
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputField: {
        width: '60%',
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.0975)',
        borderWidth: 1,
    }
});

export default SignUp;
