import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignUp  from './SignUp';
import SignIn from './SignIn';
import  styles  from "./Styles";

class Home extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Welcome to the Jungle</Text>
      <View style={ styles.buttonContainer }>
        <Button 
          title='SignUp'
          color="#ffa500"
          onPress={() => {
            this.props.navigation.navigate('SignUp')
          }}
        />
        </View>
        <View style={styles.buttonContainer }>
        <Button 
          title='SignIn'
          color="#ffa500"
          onPress={() => {
            this.props.navigation.navigate('SignIn')
          }}
        />
        </View>
      </View>
    );
  }
}

const Screens = StackNavigator({
  Home: { screen: Home },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
});

export default Screens


