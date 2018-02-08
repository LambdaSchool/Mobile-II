import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View style={{ padding: 10 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter email address."
                    onChangeText={(text) => this.setState({ text })}
                />
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter password."
                    onChangeText={(text) => this.setState({ text })}
                />
                <TouchableOpacity style={button}>
                    <Text style={buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        height: 60,
        width: 350
    },
    buttonText: {
        fontSize: 20,
        justifyContent: 'center'
    }

});

const { button, buttonText } = styles;

export default Signup;