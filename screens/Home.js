import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Button 
} from 'react-native';

class Home extends Component {

  render() {
    
    const { navigate } = this.props.navigation;

    return (
      <View style={ styles.flexRow } >
        <Button title="Sign Up" onPress={ () => navigate('SignUp') } />
        <Button title="Sign In" onPress={ () => navigate('SignIn') } />
      </View>
    );

  }

}

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Home;
