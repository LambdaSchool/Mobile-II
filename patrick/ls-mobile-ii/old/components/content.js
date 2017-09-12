import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [{ text: 'Pineapple' }, { text: 'Tomato' }]
    };
  }

  static navigationOptions = {
    title: 'Content Page'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is from the Content component</Text>
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
