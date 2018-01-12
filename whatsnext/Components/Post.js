import React from 'react';
import { Component, AsyncStorage, Text, View, TextInput } from 'react-native';
import styles from '../Styles/postPage'

import { StackNavigator } from 'react-navigation';
import CatePage from './catPage'

export default class Post extends React.Component{
  state = {
    tasks: [],
    text: '',
    error:''
  };
  componentWillMount() {
    const myList = [{ text: 'Sam', description: 'is whatever'}];
    AsyncStorage.setItem('list', JSON.stringify(myList));
  }
  componentDidMount() {
    const myList = AsyncStorage.getItem('list');
    myList
      .then(res => {
        console.log(res)  
      })
      .catch(err => {
        console.log(err)
      });
  };
  handleTextChange = text => {
    this.setState({ text });
  };
  addPost = () =>{
    if (this.state.text === '') {
      this.setState({ error: 'No message in the text field' });
      setTimeout(() => {
        this.setState({ error:''});
      }, 2000);
      return;
    }
    this.setState(prevState => {
      let { text, tesks } = prevState;
      return{
        tasks: tasks.concat({ key: tasks.length, text})
      };
    });
  };
  deleteTask = index => {
    this.setState(prevState => {
      let tasks = prevState.tasks.slice();
      tasks.splice(index, 1);
      return { tasks };
    });
  };

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.headerText}> List of Posts </Text>
        <Text
          onPress={() => {
            this.props.navigation.navigate('CatPage')
          }
        }>Random Cat Facts 
        </Text>
        <TextInput/>
        <Button/>
      </View>
    );
  };
};