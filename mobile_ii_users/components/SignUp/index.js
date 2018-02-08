import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../Styles';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            user: {
                email: '',
                password: '',
            }
        }
    }
    handleEmailChange = () => {

    }

    handlePasswordChange = () => {

    }

    handleSubmit = () => {

    }

    componentDidMount() {

    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.formHeader}>Please Sign Up Here</Text>
                <Text style={styles.formText}>All fields are required</Text>
                <View style={styles.formWrapper}>
                    <TextInput
                        style={styles.shortInput}
                        onChangeText={this.handleEmailChange}
                        value={this.state.email}
                        underlineColorAndroid='transparent'
                        placeholder="email"
                    />
                    <TextInput
                        style={styles.shortInput}
                        onChangeText={this.handlePasswordChange}
                        value={this.state.password}
                        underlineColorAndroid='transparent'
                        placeholder="password"
                    />
                </View>
                <Button title='Sign Up' />
            </View>
        );
    }
}

export default SignUp;