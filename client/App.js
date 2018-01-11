import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Content from './Content';
import styles from './Styles';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to your App</Text>
        <View>
          <TouchableOpacity
            style={styles.navbtn}
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          >
            <Text style={styles.navbtntext}> Sign Up </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navbtn}
            onPress={() => {
              this.props.navigation.navigate('SignIn');
            }}
          >
            <Text style={styles.navbtntext}> Sign In </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home: { screen: Home },
  SignUp: { screen: SignUp },
  SignIn: { screen: SignIn },
  Content:  { screen: Content }
});

export default Routes;