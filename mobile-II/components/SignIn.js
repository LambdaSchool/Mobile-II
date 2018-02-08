import React from 'React';
import axios from 'axios';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

const URL = 'https://mobile-server-ii.herokuapp.com/';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    };

    handleInputChange = (text, type) => {
        this.setState({[type]: text});
    };

    signIn = () => {
        const {email, password} = this.state;
        axios
            .post(`${URL}signin`, {email, password})
            .then(response => {
                const {token} = response.data;
                AsyncStorage.setItem('token', token);
                // set token on local storage.
                this
                    .props
                    .navigation
                    .navigate('Contents')
                // navigate on successfull signIn.
            })
            .catch(error => {
                console.log(error);
                this.setState({error: 'incorrect email/password'});
                setTimeout(() => {
                    this.setState({error: null});
                }, 3000);
            });

        this.setState({email: '', password: ''});
    };

    render() {
        return (
            <View style={container}>

                <Text style={heading}>
                    Sign in to an Account
                </Text>
                <TextInput
                    onChangeText={(text) => this.handleInputChange(text, 'email')}
                    style={inputStyle}
                    placeholder="Email"/>
                <TextInput
                    onChangeText={(text) => this.handleInputChange(text, 'password')}
                    secureTextEntry={true}
                    style={inputStyle}
                    placeholder="Password"/>
                <Button onPress={() => this.signIn()} title="Sign In"/> 
                {this.state.error !== null ? <Text style={errorText}>{this.state.error}</Text> : null}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading: {
        fontSize: 20
    },
    inputStyle: {
        height: 30,
        width: 250,
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    errorText: {
        fontSize: 18,
        color: 'red'
    }
});

const {container, heading, inputStyle, errorText} = styles;

export default SignUp;