import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './Styles';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Content from './Content';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to Mobile-II</Text>
        <View style={styles.buttons}>
          <Button
            title="Sign In"
            onPress={() => {
            this.props.navigation.navigate('SignIn');
            }}
          />
          <Button
            title="Sign Up"
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home: { screen: Home },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Content: { screen: Content }
});

export default Routes;

