import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Button, 
  Image,
  TextInput 
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import SignIn from './SignIn';
import SignUp from './SignUp';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Image 
          style={styles.topImage}
          source={{ uri: 'http://eliteescapestravel.com/wp-content/uploads/sites/40/2016/02/cool_island_hawaii.png' }} />
        <Button
          title={'SignIn'}
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
        <Button
          title={'SignUp'}
          onPress={() => this.props.navigation.navigate('SignUp')}
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
  topImage: {
    height: 400,
    alignSelf: 'stretch',
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    width: 50,
  },
});

const Routes = StackNavigator({
  Home: { screen: HomeScreen },
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp },
});

export default Routes;