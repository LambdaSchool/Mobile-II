import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import axios from 'axios';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.signIn = this.signIn.bind(this);
    }
    signIn() {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('https://mobile-server-ii.herokuapp.com/signin', user)
        .then(res => {
            AsyncStorage.setItem('token', res.data.token)
            .then(() => {
                //console.log(res.data);
                this.props.navigation.navigate('Content', { _id: res.data.user._id });
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    static navigationOptions = {
        title: 'Sign In'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Enter your Email address:</Text>
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
                <Text>Enter Your Password:</Text>
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
                    title={'Sign In'}
                    onPress = {this.signIn} />
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

export default SignIn;