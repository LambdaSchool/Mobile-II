import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignIn from './SignIn';

class Home extends React.Component {
  constructor(props) {
    super(props);
      this.state = {

    };
  }
  static navigationOptions = {
    title: 'Homepage'
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title = {'SignIn'}
          onPress = {() => {
            this.props.navigation.navigate('SignIn')
          }}
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
  Home: { screen: Home },
  SignIn: { screen: SignIn },

})

export default Routes;
