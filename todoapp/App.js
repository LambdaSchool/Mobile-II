import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Content from './components/Content';
import glassblowing from './images/smallGlassblowing.jpg';

const Home = props => {
  const { navigate } = props.navigation;
    return (
      <View style={container}>
        <Text style={title}>Under The Wire</Text>
        <Text>Log In and Get Your Hands Dirty</Text>
        <Image source={glassblowing} style={bannerImage} />
        <TouchableOpacity onPress={() => navigate('signUp')} style={button}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('signIn')} style = {button}>
          <Text>Sign In</Text>
        </TouchableOpacity>
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
  title : {
    fontSize: 32,
    fontWeight: 'bold',
  },
  button : {
    alignItems: 'center',
    height: 48,
    width: 290,
    padding: 10,
    margin: 15,
    backgroundColor: '#add8e6',
  },
  bannerImage: {
    height: 200,
    margin: 10,
  },

});
const { container, title, button, bannerImage } = styles;

const Routes = StackNavigator({
Home : { screen: Home },
signIn : { screen: SignIn },
signUp : { screen: SignUp },
Content: { screen: Content },

});


export default Routes;