import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Contents from './Components/Contents';
import axios from 'axios';



const Home = props => {
  console.log('PROPS', props);
  const { navigate } = props.navigation
  return (
    <View style={container}>
      <Image
        style={image}
        source={{ uri: 'http://www.tuxxin.com/wp-content/uploads/2013/09/home-icon.png' }}
      />
      <View style={buttonsContainer} >
        <TouchableOpacity style={button} onPress={() => navigate('Signup')}>
          <Text style={buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={() => navigate('Signin')}>
          <Text style={buttonText} >Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={button} onPress={() => navigate('Contents')}>
          <Text style={buttonText} >Contents</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcc99',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: 200,
    width: 200,
    margin: 40
  },
  buttonsContainer: {
    height: 200,
    width: 360,
    marginVertical: 2,
  },
  button: {
    backgroundColor: 'white',
    height: 60,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    padding: 20,
    color: 'darkgray',
    borderRadius: 20,
    fontSize: 20
  }
});

const { container, buttonsContainer, image, buttonText, button } = styles;

const Routes = StackNavigator({
  Home: { screen: Home },
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  Contents: { screen: Contents }
})

export default Routes;

