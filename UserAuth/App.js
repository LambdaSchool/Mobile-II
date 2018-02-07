import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SignIn, SignUp } from './components/index';

const App = (props) => {
  return (
    <View style={container}>
      <View style={buttonWrapper}>
        <Button style={button} title="Sign In" onPress={() => props.navigation.navigate('SignIn')}/>
        <Button style={button} title="Sign Up" onPress={() => props.navigation.navigate('SignUp')}/>
      </View>
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
  buttonWrapper: {
    justifyContent: 'space-around'
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
  }
});

const { container, buttonWrapper, button } = styles;

const Routes = StackNavigator({
  Home: { screen: App },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn }
});

export default Routes;

