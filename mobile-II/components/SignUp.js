import React from 'react';
import { View, Text, Stylesheet, TextInput, Button, AsyncStorage, StyleSheet } from 'react-native';
import axios from 'axios';
const URL = 'https://mobile-server-ii.herokuapp.com'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (text, type) => {
        this.setState({[type]: text});
        console.log(this.state);
    };

    signUp = () => {
        const { email, password } = this.state;
        axios.post(`${URL/users}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(error);
                this.setState({
                    error: 'Error signing up',
                });
            });
        this.setState({
            email: '',
            password: ''
        });
    };

    render() {
        return (
            <View style={container}>
                <Text style={heading}>
                    Create an Account
                </Text>
                <TextInput onChangeText={(text) => this.handleInputChange(text, 'email')} style={styles.textInput} />
                <TextInput onChangeText={(text) => this.handleInputChange(text, 'password')} style={styles.textInput} />
                <Button onPress={() => this.signUp()} title="Sign Up" />
                {this.state.error !=- null ? <Text>{this.state.error} </Text> : null}
            </View>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyBlue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 20
    },
    textInput: {
        height: 20,
        borderColor: 'black',
        borderWidth: 1,
        width: 100,
    },
});

export default SignUp;