import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TodoList from './TodoList';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Content from './Content';
import styles from './Styles';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to your Todo List</Text>
        <Button
          title="Sign Up"
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}
        />
        <Button
          title="Todo List"
          onPress={() => {
            this.props.navigation.navigate('TodoList');
          }}
        />
        <Button
          title="Sign In"
          onPress={() => {
            this.props.navigation.navigate('SignIn');
          }}
        />
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home: { screen: Home },
  TodoList: { screen: TodoList },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Content: { screen: Content },
});

export default Routes;
