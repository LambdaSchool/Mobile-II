import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Content from './screens/Content';
import UsersList from './screens/UsersList';
import Todos from './screens/Todos';

export default StackNavigator({
  Home: {
    screen: Home,
  },
  SignUp: {
    screen: SignUp,
  },
  SignIn: {
    screen: SignIn,
  },
  Content: {
    screen: Content,
  },
  UsersList: {
    screen: UsersList,
  },
  Todos: {
    screen: Todos,
  },
});
