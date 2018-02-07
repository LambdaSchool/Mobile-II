import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Content from './Content';

const Home = props => {
  const { navigate } = props.navigation;
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button onPress={() => navigate('signUp', { navigate: props.navigation.navigate })} title='Sign Up' />
        <Button onPress={() => navigate('signIn')} title='Sign In' />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button : {
    margin: 5,
  }
});

const Routes = StackNavigator({
Home : { screen: Home },
signIn : { screen: SignIn },
signUp : { screen: SignUp },
Content: { screen: Content },

});


export default Routes;