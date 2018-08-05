import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Content from './components/Content';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Mobile II',
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              marginBottom: 80, 
              textAlign: 'center'}}>
            Welcome to Mobile-II App
          </Text>
          <Button title={'Sign Up'}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}/>
        </View>
        <View style={styles.button}>
          <Button title={'Sign In'}
          onPress={() => {
              this.props.navigation.navigate('SignIn');
            }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: 200,
  },
  container: {
    paddingTop: 120,
    height: 100,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#b4b4b4',
    justifyContent: 'center',
  },
});

const App = StackNavigator({
  Home: { screen: Home },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Content: { screen: Content },
});

export default App;
