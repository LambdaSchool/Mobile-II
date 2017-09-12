import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignIn from './signin';
import SignUp from './signup';
import Content from './content';
// import Async from '../Async';

// export default class Home extends React.Component {
  class Home extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>This is from the Home component</Text>
          <SignIn />
          <SignUp />
          <Content />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      // backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'center',
      // marginTop: 20,
    },
  });
  //
  const Routes = StackNavigator({
  //   Home: { screen: Home },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    Content: { screen: Content },
  //   Async: { screen: Async },
  });
  //
  export default Routes;