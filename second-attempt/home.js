import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';


export default class Home extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>Home!</Text>
          <Button
        onPress={() => this.props.navigation.navigate('SignIn')}
        title="Sign In1"
      />
      <Button
        onPress={() => this.props.navigation.navigate('SignUp')}
        title="Sign Up!"
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