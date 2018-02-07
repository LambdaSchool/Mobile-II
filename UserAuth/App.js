import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SignIn, SignUp, Content } from './components/index';

const App = (props) => {
  navigationOptions = {
    header: {
      visible: false,
    }
  };
  return (
    <View style={container}>
      <View style={buttonWrapper}>
        <TouchableOpacity 
          style={button} 
          onPress={() => props.navigation.navigate('SignIn')} 
        >
          <Text style={buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={button} 
          onPress={() => props.navigation.navigate('SignUp')} 
        >
          <Text style={buttonText}>Sign Up</Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center'
  }
});

const { container, buttonWrapper, button, buttonText } = styles;

const Routes = StackNavigator({
  Home: { screen: App },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Content: { screen: Content }
});

export default Routes;

