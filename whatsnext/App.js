import React from 'react';
import {Text, View, TextInput, Button, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './Styles/home';
import CreateUser from './Components/createUser';
import CatPage from './Components/catPage';
import Post from './Components/Post'
let {height, width} = Dimensions.get('window');

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.innerTextBox}> WeirdBook </Text>
        <View style={styles.login2}>
          <Text>Email</Text><TextInput style={styles.textBox} underlineColorAndroid='transparent'/>
          <Text>Passsword</Text><TextInput style={styles.textBox} underlineColorAndroid='transparent'/>
          <Text>{"\n"}</Text>
          <Button 
            title = 'Login' 
            style={styles.buttonStyle}
            onPress={() => {
              this.props.navigation.navigate('Post');
            }}
          />
          <Text>{"\n"}</Text>
          <Button 
            title = 'Sign Up' 
            style={styles.buttonStyle} 
            onPress={()=>{
              this.props.navigation.navigate('CreateUser');
            }}
          />
        </View>
      </View>
    );
  }
}

const Routes = StackNavigator({
  Home:{ screen: Home },
  CreateUser:{ screen: CreateUser },
  CatPage: { screen: CatPage },
  Post: { screen: Post }
});

export default Routes;