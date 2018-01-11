import React from 'react';
import { StyleSheet, View } from 'react-native';

export default props => (
  <View style={styles.container}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#f6d54a',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10
  }
});
