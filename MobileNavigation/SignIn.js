import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList
} from 'react-native';


export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'abc@lambda.com',
      password: 123,
    };
  }

  static navigationOptions = {
    title: 'SignIn'
  }

  render() {
    return (
      <View>
        <FlatList 
          data={this.state}
          renderItem={({ item }) => {
            return <Text>{item.text}</Text>;
          }}/>
      </View>
    );
  }
}