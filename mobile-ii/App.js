import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SignUp, SignIn, Content } from './Components/index';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button 
          onPress={() => { this.props.navigation.navigate('SignIn') }}
          title="Sign In" />
        <Button 
          onPress={() => { this.props.navigation.navigate('SignUp') }}
          title="Sign Up" />
      </View>
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

const Routes = StackNavigator({
  Home: { screen: Home },
  Content: { screen: Content},
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
});

export default Routes;