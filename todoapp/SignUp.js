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
import { StackNavigator } from 'react-navigation';
import axios from 'axios';

const ROOT_URL = 'https://mobile-server-ii.herokuapp.com';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    handleButtonSubmit() {
        const email = this.state.email;
        const password = this.state.password;
        axios
            .post(`${ROOT_URL}/users`, { email, password })
            .then(res => {
                AsyncStorage.setItem('token', res.data.token)
                .then(() => {
                    this.props.navigation.navigate('Content');
                })
                .catch(error => console.log('Problem saving token: ', error))
            })
            .catch(error => {
                if (error) console.log('Error: ', error);
            });
    };

    render () {
        return (
            <View style={container}>
                <Text>Sign Up Screen</Text>
                <TextInput onChangeText={(text) => this.setState({ email: text}) } placeholder = 'Enter Your Email Address' />
                <TextInput onChangeText={(text) => this.setState({ password: text }) } placeholder = 'Enter Your Password' />
                <TouchableOpacity onPress={this.handleButtonSubmit.bind(this)} style = {button}>
                    <Text>Create Account</Text>
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
            button : {
              alignItems: 'center',
              height: 48,
              width: 200,
              padding: 10,
              margin: 10,
              backgroundColor: '#add8e6',
            },
          
          });
          const { container, button } = styles;
export default SignUp;