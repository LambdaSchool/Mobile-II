import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {StackNavigator} from 'react-navigation';

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button onPress={() => this.props.navigation.navigate('Signin')} title={'Sign In!'}/>
            <Button onPress={() => this.props.navigation.navigate('Signup')} title={'Sign Up!'}/>
        </View>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
