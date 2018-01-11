import React from 'react';
import { StackNavigator } from 'react-navigation';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
} from 'react-native';
import ToDoList from './components/ToDoList';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>To Do List</Text>
        <Button
          title={'Sign Up'}
          onPress={() => {
            this.props.navigation.navigate('SignUp');
          }} />
        <Button
          title={'Sign In'}
          onPress={() => {
            this.props.navigation.navigate('SignIn');
          }} />
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
  ToDoList: { screen: ToDoList },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
});

export default Routes;
