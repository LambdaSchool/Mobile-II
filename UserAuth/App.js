import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SignIn, SignUp, Content } from './components/index';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null
    }
  }

  handleTodoPress = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.navigate('Content');
    } else {
      this.setState({ error: 'Must Sign In' });
      setTimeout(() => {
        this.setState({ error: null });
      }, 2000);
      return undefined;
    }
  }

  render() {
    return (
      <View style={container}>
        <Text style={header}>Todo List</Text>
        <View style={buttonWrapper}>
          <TouchableOpacity 
            style={button} 
            onPress={() => this.props.navigation.navigate('SignIn')} 
          >
            <Text style={buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={button} 
            onPress={() => this.props.navigation.navigate('SignUp')} 
          >
            <Text style={buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={button} 
            onPress={() => this.handleTodoPress()} 
          >
            <Text style={buttonText}>Todos</Text>
          </TouchableOpacity>
          {this.state.error ? <Text style={errorText}>{this.state.error}</Text> : null}
        </View>
        
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
  header: {
    fontSize: 50,
    marginTop: 20
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center'
  }
});

const { container, header, buttonWrapper, button, buttonText, errorText } = styles;

const Routes = StackNavigator({
  Home: { screen: App },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Content: { screen: Content }
});

export default Routes;

