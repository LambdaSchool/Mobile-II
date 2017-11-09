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

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        const { email, password } = this.state;
        axios.post('https://mobile-server-ii.herokuapp.com/signin', { email, password })
            .then((response) => {
                if (response.data.code === 11000) {
                    return this.setState({ error: 'That password is already in use.', });
                }
                AsyncStorage.setItem('token', response.data.token)
                this.props.navigation.navigate('Content');
            })
            .catch((error => {
                console.log(error);
            }));
    }

    static navigationOptions = {
        title: 'Sign In'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Enter your email address
                </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(email) => this.setState({ email })}
                    value={ this.state.email }
                    placeholder='Email'
                />
                <Text>
                    Enter your password
                </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={(password) => this.setState({ password })}
                    value={ this.state.password }
                    placeholder='Password'
                />
                <Button
                    title={'Submit'}
                    onPress={() => {
                        this.signIn();
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

export default SignIn;
