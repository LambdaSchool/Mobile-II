import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Content from './components/Content';

class Home extends Component {

  static navigationOptions = {
    title: 'Home Page'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome! Please SIGN IN or SIGN UP</Text>
        <Button 
          title={'Sign In'}
          onPress={() => {
            this.props.navigation.navigate('SignIn')
          }}
        />
        <Button 
          title={'Sign Up'}
          onPress={() => {
            this.props.navigation.navigate('SignUp')
          }}
        />
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
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp  },
  Content: { screen: Content },
});

export default Routes;
