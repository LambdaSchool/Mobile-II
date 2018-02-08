import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './components/Styles';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Contents from './components/Contents';
import Headers from './components/Headers';

class Home extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.formHeader}>This is The Home Page</Text>
        <Text style={styles.formText}>Select an Option from Below</Text>
        <View style={styles.buttonWrapper}>
          <Button style={styles.button} title='Sign In' onPress={() => this.props.navigation.navigate('SignIn')} />
          <Button style={styles.button} title='Sign Up' onPress={() => this.props.navigation.navigate('SignUp')} />
          <Button style={styles.button} title='Contents' onPress={() => this.props.navigation.navigate('Contents')} />
        </View>
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: <Headers.HomeHeader />
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      headerTitle: <Headers.SignInHeader />
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      headerTitle: <Headers.SignUpHeader />
    }
  },
  Contents: {
    screen: Contents, navigationOptions: {
      headerTitle: <Headers.ContentsHeader />
    }
  },
},
  { // This Hides the Nav Bar Ontop
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

export default class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}