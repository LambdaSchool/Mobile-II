import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import {StackNavigator} from 'react-navigation';
import axios from 'axios';

export class SigninScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    // signinUser() {
    //     const navigate = this.props.navigation.navigate.bind(this)
    //     const { email, password } = this.state;
    //     axios.post('https://mobile-server-ii.herokuapp.com/signin', {
    //         email: email , password: password
    //     })
    //     .then(function (response) {
    //         AsyncStorage.setItem('token', response.data.token).then(() => {
    //             navigate('Content');
    //         });
    //     })
    //     .catch(function (error) {
    //         console.log(error, 'this error');
    //     });
    // }

  render() {
    
    return (
      <View style={styles.container}>
        <Text>SIGNIN</Text>
        <TextInput 
            style={{ width: '85%' }}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            keyboardType={'email-address'}
        />
        <TextInput 
            style={{ width: '85%' }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
        />
        <Button onPress={() => {
            const navigate = this.props.navigation.navigate.bind(this)
            const { email, password } = this.state;
            axios.post('https://mobile-server-ii.herokuapp.com/signin', {
                email: email , password: password
            })
            .then(function (response) {
                AsyncStorage.setItem('token', response.data.token).then(() => {
                    navigate('Content');
                });
            })
            .catch(function (error) {
                console.log(error, 'this error');
            });
        }} title={'Submit!'}/>
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
});
