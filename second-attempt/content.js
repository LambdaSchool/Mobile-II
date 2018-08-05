import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import axios from 'axios'


export default class Content extends React.Component {
  constructor(props){
    super(props)
    this.state={ count: 0}
  }
    render() {
      return (
        <View style={styles.container}>
          <Text>Content!</Text>
          <Button 
          onPress={() => {
            AsyncStorage.getItem('token')
            .then((token) => { // retrieve the token from "localStorage"
              axios.get('https://mobile-server-ii.herokuapp.com/users', {
                headers: {
                  authorization: token, // attach the token as a header
                }
              })
              .then(response => {
                let counter = this.state.count;
                console.log(response.data[counter])
                 counter++;
                this.setState({ data: response.data[counter], count: counter})
              })
              .catch((err) => err)
            });
          }}
          title='get stuff'
          />
          <View >
            <Text> Email # {this.state.count}: { this.state.data && this.state.data.email.toString() }</Text>
          </View>
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