import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import styles from '../Styles';

class Contents extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.formHeader}>This is the Contents Page</Text>
            </View>
        );
    }
}

export default Contents;