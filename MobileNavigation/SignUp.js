import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput 
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Content from './Content';

export default class SignUp extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation.navigate;
    return (
      <View style={styles.container}>
        <Button
          title={'Content'}
          onPress={() => navigate('Content')}
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

