import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput 
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Button
          title={'SignIn'}
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
        <Button
          title={'SignUp'}
          onPress={() => this.props.navigation.navigate('SignUp')}
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
  Home: { screen: HomeScreen },
  SignIn: { screen: SignIn },
  SignUp: { 
    // path: 'https://mobile-server-ii.herokuapp.com/',
    screen: SignUp },
});

export default Routes;