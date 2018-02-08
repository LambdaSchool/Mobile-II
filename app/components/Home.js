import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ({ navigation }) => (
  <View style={styles.container}>
    <Text>Home</Text>
    <Button  
      title='Sign Up' 
      onPress={() => navigation.navigate('SignUp')} 
    />
    <Button 
      title='Sign In'
      onPress={() => navigation.navigate('SignIn')} 
    />
  </View>
)