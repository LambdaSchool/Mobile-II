import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import signIn from './components/signin';
import signUp from './components/signup';
//import content from  './components/content';

const Home = props => {
  console.log('PROPS', props);
  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title='sign-in' onPress={() => navigate('signin')} />
      <Button title='sign-up' onPress={() => navigate('signup')} />
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
  signin: { screen: signIn },
  signup: { screen: signUp },
  //content: { screen: content}
});

export default Routes;