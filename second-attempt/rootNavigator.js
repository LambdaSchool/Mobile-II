import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14


import SignInScreen from './signIn.js'
import SignUpScreen from './signUp.js'
import HomeScreen from './home.js'
import ContentScreen from './content.js'


const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'SignUp',
    },
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerTitle: 'SignIn',
    },
  },
  Content: {
    screen: ContentScreen,
    navigationOptions: {
      headerTitle: 'Content',
    },
  },
});

export default RootNavigator;