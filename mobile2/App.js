import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation';
import { SigninScreen } from './screens/signin';
import { HomeScreen } from './screens/home';
import { SignupScreen } from './screens/signup';
import { ContentScreen } from './screens/content';
import { RootNavigator } from './components/navigator';

export default class App extends React.Component {
  render() {
    return (
        <RootNavigator />
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
