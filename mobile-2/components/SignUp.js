import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.signUp = this.signUp.bind(this);
    }
    signUp() {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('https://mobile-server-ii.herokuapp.com/users', user)
        .then(res => {
            AsyncStorage.setItem('token', res.data.token)
            .then(() => {
                this.props.navigation.navigate('Content', { _id: res.data.user._id });
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    static navigationOptions = {
        title: 'Sign Up'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Enter Your Email Address:</Text>
                <TextInput 
                    underlineColorAndroid='transparent'
                    style={{ 
                        width: 250, 
                        backgroundColor: '#fff', 
                        borderColor: 'black', 
                        borderWidth: 1, 
                        marginBottom: 30 }} 
                    onChangeText={(email) => this.setState({ email })} 
                    value={this.state.email} />
                <Text>Enter a Password:</Text>
                <TextInput 
                    underlineColorAndroid='transparent'
                    style={{ 
                        width: 250, 
                        backgroundColor: '#fff', 
                        borderColor: 'black', 
                        borderWidth: 1,
                        marginBottom: 30 }}
                    onChangeText={(password) => this.setState({ password })} 
                    value={this.state.password} />
                <Button 
                    title={'Sign Up'}
                    onPress = {this.signUp} />
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

export default SignUp;