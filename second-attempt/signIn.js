import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import axios from 'axios'


export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'Useremail', password: 'Password'};
  }
    render() {
      return (
        <View style={styles.container}>
          <Text>Sign In!</Text>
          <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
            />
            <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, secureTextEntry: true, caretHidden: true}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
            />
            <Button
        onPress={() => {
          const navigate = this.props.navigation.navigate.bind(this)
            const { email, password } = this.state;
            axios.post('https://mobile-server-ii.herokuapp.com/signin', {
                email: email , password: password
              })
              .then(function (response) {
                console.log(response.data.token);
                AsyncStorage.setItem('token', response.data.token)
                .then(()=> {
                  AsyncStorage.getItem('token').then(item => console.log(item))
                })
                  .then(() => {
                    navigate('Content');
                  });
              })
              .catch(function (error) {
                console.log(error);
              });
        }}
        title="send up"
      />
          <Button
        onPress={() => this.props.navigation.navigate('Content')}
        title="Content!"
      />
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
  