import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './components/Signin';
import SignUp from './components/Signup';
import Content from './components/Content';

class Home extends React.Component {
  static navigationOptions = {
    header: null,
  }
  render() {
    return (
      <View style={styles.container}>
      <View style= {buttonswrapper}>
          <TouchableOpacity style={button} onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text style={buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={button} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={buttonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
      </View>
    );
  }
}

 export default StackNavigator({
   Home: {
     screen: Home,
   },
   SignIn: {
    screen: SignIn
  },
  SignUp: {
    screen: SignUp
  },
  Content: {
    screen: Content
  },
 })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    buttonswrapper:{
        flex:0,
        width:'80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        flex:0,
        width: '45%',
        height:50,
        backgroundColor: '#e50914',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText :{
        color:'white',
    },
  });

const {button, buttonText, buttonswrapper,container} = styles
