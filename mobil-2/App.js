import React from 'react';
import { 
  StyleSheet,
   Text, 
   View,
   Button, 
  } from 'react-native';
  import { StackNavigator } from 'react-navigation';
  //import Content from './components/Content';
  //import SignUp from './components/SignUp';
 // import SignIn from './components/SignIn';

const Home = props => {
const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title='Sign In' onPress={() => alert('SignIn')} />
      <Button title='Sign Up' onPress={() => alert('SignUp')} />
    </View>
  )
};

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
  //SignUp: { screen: SignUp },
  //SignIn: { screen: SignIn },
  //Content: { screen: Content },
});

export default Routes;