import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Content from './Content';
import Async from './Async';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  static navigationOptions = {
    title: 'Home Page'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter your email address:</Text>
        <TextInput 
          style={{ width: 50 }} 
          onChangeText={(email) => this.setState({ email })} 
          value={this.state.email} />
        <Button 
          title={'View Content'} 
          onPress={() => {
            this.props.navigation.navigate('Content');
          }} />
        <Button 
          title={'View Async Content'} 
          onPress={() => {
            this.props.navigation.navigate('Async');
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
  Content: { screen: Content },
  Async: { screen: Async },
});

export default Routes;
