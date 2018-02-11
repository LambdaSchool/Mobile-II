import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './components/Styles';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Contents from './components/Contents';
import TodoList from './components/TodoList';
import Headers from './components/Headers';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      JWT: null,
    }
  }
  componentWillMount() {
    let JWT = '';
    AsyncStorage.getItem('JWT', (err, result) => {
      if (err) console.log(err);
      JWT = String(result);
      this.setState({ JWT });
    });
  }
  render() {
    if (this.state.JWT !== null) {
      return (
        <View style={styles.container}>
          <Text style={styles.formHeader}>Welcome Back</Text>
          <Text style={styles.formText}>Select an Option from Below</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TodoList')}>
              <Text style={styles.buttonText}>Todo List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>Change Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.formHeader}>Welcome</Text>
          <Text style={styles.formText}>Select an Option from Below</Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={styles.buttonText}>Sign IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TodoList')}>
              <Text style={styles.buttonText}>Todo List</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
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
  TodoList: {
    screen: TodoList,
    navigationOptions: {
      headerTitle: <Headers.TodoListHeader />
    }
  },
},
  // { // This Hides the Nav Bar Ontop
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerVisible: false,
  //   }
  // }
);

export default class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}