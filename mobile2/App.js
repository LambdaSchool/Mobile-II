import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Content from './components/Content';

class Home extends Component {
  static navigationOptions = {
    title: 'Home Page'
  }
  render () {
    return (
        <View style = {styles.container}>
          <Text>
            Please sign up! If you already have an account, sign in!
          </Text>
          <Button
            title = {'Sign in'}
            onPress={() => {
            this.props.navigation.navitage('SignIn')}
            }}
          />
        </View>
    )
  }
}

const Routes = StackNavigator({
    Home: { screen: Home },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp  },
    Content: { screen: Content },
});

export default Routes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


