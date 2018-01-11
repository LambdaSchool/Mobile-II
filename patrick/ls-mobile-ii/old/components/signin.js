import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SignIn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is from the SignIn component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
