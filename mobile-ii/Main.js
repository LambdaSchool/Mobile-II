import React from 'react';
import { View, Button, Image } from 'react-native';
import { nav } from './actions';
import { connect }from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Styles';

const Main = (props) => (
  <View style={styles.buttonContainer}>
    <Image 
      source={{ uri: 'https://1001freedownloads.s3.amazonaws.com/icon/thumb/336947/Cat-icon.png' }}
      style={styles.mainImage}
    />
    <Button
      color='black'
      style={styles.button}
      title="To Dos"
      onPress={() => props.nav('User')}
    />
    <Button
      color='black'
      style={styles.button}
      title="Users"
      onPress={() => props.nav('Users')}
    />
  </View>
);

const mapDispatchToProps = (dispatch) => bindActionCreators({ nav }, dispatch);

export default connect(null, mapDispatchToProps)(Main);